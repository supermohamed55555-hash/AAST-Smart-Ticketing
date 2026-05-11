import { NextResponse } from "next/server";
import { categorizeTicket } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    if (!description) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const category = await categorizeTicket(description);
    return NextResponse.json({ category });
  } catch (error) {
    console.error("AI Categorization Error:", error);
    return NextResponse.json({ error: "Failed to categorize ticket" }, { status: 500 });
  }
}
