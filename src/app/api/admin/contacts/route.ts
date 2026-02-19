import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

export async function GET() {
  try {
    await dbConnect();
    const contacts = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
