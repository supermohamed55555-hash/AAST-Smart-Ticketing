import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { universityRoot } from "@/lib/tree";

// Academic Utility: Binary Search Implementation
function binarySearch(arr: any[], targetId: string) {
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

    if (checkStack === "true") {
      const lastAction = await prisma.adminAction.findFirst({ orderBy: { timestamp: "desc" } });
      return NextResponse.json({ hasActions: !!lastAction });
    }

    if (notifications === "true") {
      const student = await prisma.student.findFirst();
      if (!student) return NextResponse.json([]);
      const notifs = await prisma.notification.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: "desc" }
      });
      return NextResponse.json(notifs);
    }

    if (stats === "true") {
      const activeCount = await prisma.ticket.count({ where: { status: "PENDING" } });
      const resolvedCount = await prisma.ticket.count({ where: { status: "COMPLETED" } });
      const urgentCount = await prisma.ticket.count({ where: { status: "PENDING", priority: "URGENT" } });
      return NextResponse.json({ activeCount, resolvedCount, urgentCount });
    }

    const tickets = await prisma.ticket.findMany({
      include: { student: { include: { user: true } }, department: true },
      orderBy: { id: "asc" }
    });

    if (searchId && tickets.length > 0) {
      const found = binarySearch(tickets, searchId);
      return NextResponse.json(found ? [found] : []);
    }

    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: "Fetch Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, studentId, departmentName, description, priority } = body;

    const { node: validatedDept } = universityRoot.bfs(departmentName);
    if (!validatedDept) return NextResponse.json({ error: "Invalid Department" }, { status: 400 });

    let dept = await prisma.department.upsert({
      where: { name: departmentName },
      update: {},
      create: { name: departmentName }
    });

    let user = await prisma.user.findFirst({ where: { name: studentName } });
    if (!user) user = await prisma.user.create({ data: { name: studentName, role: "STUDENT" } });

    let student = await prisma.student.upsert({
      where: { userId: user.id },
      update: { studentId: studentId || "20240001" },
      create: { userId: user.id, studentId: studentId || "20240001" }
    });

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
    return NextResponse.json({ error: "Post Failed" }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    // 1. Precise Ticket Lookup
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

    if (!nextTicket) return NextResponse.json({ message: "Queue is officially empty." }, { status: 200 });

    // 2. Ensure Admin Existence (Crucial step that was likely failing)
    let admin = await prisma.admin.findFirst({ include: { user: true } });
    if (!admin) {
      const adminUser = await prisma.user.create({ data: { name: "System Admin", role: "ADMIN" } });
      admin = await prisma.admin.create({ 
        data: { userId: adminUser.id, department: "Management" },
        include: { user: true }
      });
    }

    // 3. Update & Notify
    const updatedTicket = await prisma.ticket.update({
      where: { id: nextTicket.id },
      data: { status: "COMPLETED" }
    });

    await prisma.notification.create({
      data: {
        studentId: updatedTicket.studentId,
        title: "Update: Ticket Processed ✅",
        message: `Your ${updatedTicket.priority} request has been resolved by ${admin.user.name}.`,
      }
    });

    await prisma.adminAction.create({
      data: {
        adminId: admin.id,
        action: "SERVE_TICKET",
        payload: { ticketId: updatedTicket.id }
      }
    });

    return NextResponse.json({ message: "Success", ticket: updatedTicket });
  } catch (error) {
    console.error("CRITICAL PATCH ERROR:", error);
    return NextResponse.json({ error: "System Error during processing" }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const lastAction = await prisma.adminAction.findFirst({ orderBy: { timestamp: "desc" } });
    if (!lastAction) return NextResponse.json({ message: "No actions to undo" }, { status: 400 });

    const payload = lastAction.payload as any;
    await prisma.ticket.update({ where: { id: payload.ticketId }, data: { status: "PENDING" } });
    await prisma.adminAction.delete({ where: { id: lastAction.id } });

    return NextResponse.json({ message: "Undo Success" });
  } catch (error) {
    return NextResponse.json({ error: "Undo Failed" }, { status: 500 });
  }
}
