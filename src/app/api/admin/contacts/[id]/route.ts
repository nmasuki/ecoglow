import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await dbConnect();

    const contact = await ContactSubmission.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!contact) {
      return NextResponse.json(
        { error: "Contact not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch {
    return NextResponse.json(
      { error: "Failed to update contact." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    await ContactSubmission.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete contact." },
      { status: 500 }
    );
  }
}
