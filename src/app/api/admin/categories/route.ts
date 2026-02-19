import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ order: 1 }).lean();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch categories." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...update } = body;
    await dbConnect();

    const category = await Category.findByIdAndUpdate(_id, update, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update category.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
