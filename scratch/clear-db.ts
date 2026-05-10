import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Starting database cleanup...");

  // Delete in order to respect foreign keys
  await prisma.notification.deleteMany();
  console.log("- Deleted all Notifications");

  await prisma.adminAction.deleteMany();
  console.log("- Deleted all Admin Actions");

  await prisma.ticket.deleteMany();
  console.log("- Deleted all Tickets");

  await prisma.service.deleteMany();
  console.log("- Deleted all Services");

  await prisma.student.deleteMany();
  console.log("- Deleted all Students");

  await prisma.admin.deleteMany();
  console.log("- Deleted all Admins");

  await prisma.department.deleteMany();
  console.log("- Deleted all Departments");

  await prisma.user.deleteMany();
  console.log("- Deleted all Users");

  console.log("✨ Database is now fresh and empty!");
}

main()
  .catch((e) => {
    console.error("❌ Cleanup failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
