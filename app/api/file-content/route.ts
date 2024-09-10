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
  console.log("File name:", fileName);

  const filePath = path.join(process.cwd(), "components/demo/", fileName);
  const files = fs.readdirSync(path.join(process.cwd(), "components/demo/"));
  console.log("Directory contents:", files);
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    console.log("File content:", fileContent);
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "File not found or unreadable" },
      { status: 500 },
    );
  }
}
