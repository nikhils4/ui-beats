import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("file");

  if (!fileName) {
    return NextResponse.json(
      { error: "File name is required" },
      { status: 400 },
    );
  }

  const filePath = path.join(process.cwd(), "components/demo/", fileName);
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    return NextResponse.json(
      { error: "File not found or unreadable" },
      { status: 500 },
    );
  }
}
