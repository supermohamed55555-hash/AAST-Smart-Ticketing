import { NextResponse } from "next/server";
import { predictTraffic } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch historical ticket counts by hour for the last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const historicalTickets = await prisma.ticket.findMany({
      where: {
        createdAt: { gte: lastWeek }
      },
      select: {
        createdAt: true
      }
    });

    // Simple grouping by hour for the AI to analyze
    const hourlyStats: Record<number, number> = {};
    historicalTickets.forEach(t => {
      const hour = new Date(t.createdAt).getHours();
      hourlyStats[hour] = (hourlyStats[hour] || 0) + 1;
    });

    const prediction = await predictTraffic(hourlyStats);
    return NextResponse.json(prediction);
  } catch (error) {
    console.error("AI Prediction Error:", error);
    return NextResponse.json({ error: "Failed to predict traffic" }, { status: 500 });
  }
}
