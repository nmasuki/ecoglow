import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filter: Record<string, string> = {};
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();

    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create product.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
