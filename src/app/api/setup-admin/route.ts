import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Create a default admin user if not exists
    const adminEmail = "admin@aast.edu";
    const adminPassword = "admin123"; // In production, use hashed passwords

    let user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "System Administrator",
          email: adminEmail,
          password: adminPassword,
          role: "ADMIN"
        }
      });
      
      // Also create Admin profile
      await prisma.admin.create({
        data: {
          userId: user.id,
          department: "General Administration"
        }
      });
    }

    return NextResponse.json({
      message: "Admin account ready",
      email: adminEmail,
      password: adminPassword,
      note: "You can now log in at /auth/login with these credentials."
    });
  } catch (error) {
    console.error("Setup Admin Error:", error);
    return NextResponse.json({ error: "Failed to setup admin" }, { status: 500 });
  }
}
