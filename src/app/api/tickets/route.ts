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
    const stats = searchParams.get("stats");
    const notifications = searchParams.get("notifications");

    if (stats === "true") {
      const activeCount = await prisma.ticket.count({ where: { status: "PENDING" } });
      const resolvedCount = await prisma.ticket.count({ where: { status: "COMPLETED" } });
      const urgentCount = await prisma.ticket.count({ where: { status: "PENDING", priority: "URGENT" } });
      return NextResponse.json({ activeCount, resolvedCount, urgentCount });
    }

    const tickets = await prisma.ticket.findMany({
      include: { student: { include: { user: true } }, department: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: "Fetch Failed" }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    // 1. Precise Lookup using the official Enum value
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

    if (!nextTicket) {
      return NextResponse.json({ message: "Queue is empty." }, { status: 200 });
    }

    // 2. Admin Safety Check
    let admin = await prisma.admin.findFirst({ include: { user: true } });
    if (!admin) {
      const adminUser = await prisma.user.create({ data: { name: "System Admin", role: "ADMIN" } });
      admin = await prisma.admin.create({ 
        data: { userId: adminUser.id, department: "Management" },
        include: { user: true }
      });
    }

    // 3. Process Ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id: nextTicket.id },
      data: { status: "COMPLETED" }
    });

    return NextResponse.json({ message: "Success", ticket: updatedTicket });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json({ error: "System Error: " + (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, studentId, departmentName, description, priority } = body;
    
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
