import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SeoSettings from "@/models/SeoSettings";

export async function GET() {
  try {
    await dbConnect();
    let settings = await SeoSettings.findOne().lean();
    if (!settings) {
      settings = await SeoSettings.create({});
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch SEO settings." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();

    let settings = await SeoSettings.findOne();
    if (!settings) {
      settings = await SeoSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to update SEO settings." },
      { status: 500 }
    );
  }
}
