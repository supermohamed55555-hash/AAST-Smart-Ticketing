import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDB() {
  console.log("🔍 Checking Database State...");
  const tickets = await prisma.ticket.findMany({
    include: { student: true, department: true }
  });
  
  if (tickets.length === 0) {
    console.log("❌ NO TICKETS FOUND IN DATABASE.");
  } else {
    console.log(`✅ FOUND ${tickets.length} TICKETS:`);
    tickets.forEach(t => {
      console.log(`- ID: ${t.id} | Status: ${t.status} | Priority: ${t.priority} | Student: ${t.student.studentId}`);
    });
  }
}

checkDB()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
