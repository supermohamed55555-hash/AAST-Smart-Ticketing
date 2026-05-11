import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { universityRoot } from "@/lib/tree";

// Academic Utility: Binary Search Implementation
function binarySearch(arr: { id: string }[], targetId: string) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid].id === targetId) return arr[mid];
    if (arr[mid].id < targetId) left = mid + 1;
    else right = mid - 1;
  }
  return null;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const checkStack = searchParams.get("checkStack");
    const searchId = searchParams.get("searchId");
    const stats = searchParams.get("stats");
    const notifications = searchParams.get("notifications");

    // 1. Check Stack Status
    if (checkStack === "true") {
      const lastAction = await prisma.adminAction.findFirst({
        orderBy: { timestamp: "desc" }
      });
      return NextResponse.json({ hasActions: !!lastAction });
    }

    // 2. Fetch Notifications for the logged-in student (Mocked to first student for demo)
    if (notifications === "true") {
      const student = await prisma.student.findFirst();
      if (!student) return NextResponse.json([]);
      const notifs = await prisma.notification.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: "desc" }
      });
      return NextResponse.json(notifs);
    }

    // 3. Fetch Real Stats
    if (stats === "true") {
      const activeCount = await prisma.ticket.count({ where: { status: "PENDING" } });
      const resolvedCount = await prisma.ticket.count({ where: { status: "COMPLETED" } });
      const urgentCount = await prisma.ticket.count({ where: { status: "PENDING", priority: "URGENT" } });
      return NextResponse.json({ activeCount, resolvedCount, urgentCount });
    }

    // 4. Regular Ticket Fetching
    const tickets = await prisma.ticket.findMany({
      include: {
        student: { include: { user: true } },
        department: true
      },
      orderBy: { id: "asc" }
    });

    if (searchId && tickets.length > 0) {
      const found = binarySearch(tickets, searchId);
      return NextResponse.json(found ? [found] : []);
    }

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("GET Tickets Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, studentId, departmentName, description, priority } = body;

    const { node: validatedDept } = universityRoot.bfs(departmentName);
    if (!validatedDept) {
      return NextResponse.json({ error: "Invalid Department" }, { status: 400 });
    }

    let dept = await prisma.department.findUnique({ where: { name: departmentName } });
    if (!dept) dept = await prisma.department.create({ data: { name: departmentName } });

    let user = await prisma.user.findFirst({ where: { name: studentName } });
    if (!user) user = await prisma.user.create({ data: { name: studentName, role: "STUDENT" } });

    let student = await prisma.student.findUnique({ where: { userId: user.id } });
    if (!student) student = await prisma.student.create({ data: { userId: user.id, studentId: studentId || "20240001" } });

    let service = await prisma.service.findFirst({ where: { departmentId: dept.id } });
    if (!service) service = await prisma.service.create({ data: { name: "General Support", departmentId: dept.id } });

    const ticket = await prisma.ticket.create({
      data: {
        studentId: student.id,
        departmentId: dept.id,
        serviceId: service.id,
        description: description,
        priority: priority === "URGENT" ? "URGENT" : "NORMAL",
        status: "PENDING"
      }
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("POST Ticket Error:", error);
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    let nextTicket = await prisma.ticket.findFirst({
      where: { status: "PENDING", priority: "URGENT" },
      orderBy: { createdAt: "asc" }
    });

    if (!nextTicket) {
      nextTicket = await prisma.ticket.findFirst({
        where: { status: "PENDING", priority: "NORMAL" },
        orderBy: { createdAt: "asc" }
      });
    }

    if (!nextTicket) return NextResponse.json({ message: "No tickets in queue" });

    let admin = await prisma.admin.findFirst();
    if (!admin) {
      const adminUser = await prisma.user.create({ data: { name: "System Admin", role: "ADMIN" } });
      admin = await prisma.admin.create({ data: { userId: adminUser.id, department: "General" } });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: nextTicket.id },
      data: { status: "COMPLETED" },
      include: {
        student: {
          include: { user: true }
        }
      }
    });

    // Create Notification with full details
    await prisma.notification.create({
      data: {
        studentId: updatedTicket.studentId,
        title: "Ticket Served ✅",
        message: `Ticket ID: #${updatedTicket.id.slice(-5)} | Student: ${updatedTicket.student.user.name} [${updatedTicket.student.studentId}] has been successfully processed.`,
      }
    });

    await prisma.adminAction.create({
      data: {
        adminId: admin.id,
        action: "SERVE_TICKET",
        payload: { ticketId: updatedTicket.id }
      }
    });

    return NextResponse.json({ message: `Served ${updatedTicket.priority} ticket`, ticket: updatedTicket });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Failed to serve ticket" }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const lastAction = await prisma.adminAction.findFirst({ orderBy: { timestamp: "desc" } });
    if (!lastAction || lastAction.action !== "SERVE_TICKET") return NextResponse.json({ message: "Nothing to undo" }, { status: 400 });

    const payload = lastAction.payload as { ticketId: string };
    await prisma.ticket.update({ where: { id: payload.ticketId }, data: { status: "PENDING" } });
    await prisma.adminAction.delete({ where: { id: lastAction.id } });

    return NextResponse.json({ message: "Undo successful." });
  } catch (error) {
    console.error("UNDO Error:", error);
    return NextResponse.json({ error: "Failed to undo" }, { status: 500 });
  }
}
