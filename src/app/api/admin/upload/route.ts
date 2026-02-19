import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".jpg";
    const safeName =
      file.name
        .replace(ext, "")
        .replace(/[^a-z0-9-]/gi, "-")
        .toLowerCase() +
      "-" +
      Date.now() +
      ext;

    const uploadDir = path.join(process.cwd(), "public", "images", "products");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/images/products/${safeName}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}
