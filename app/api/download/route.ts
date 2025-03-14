import { createAdminClient } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { storage } = await createAdminClient();

  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");

  if (!fileId)
    return NextResponse.json({ error: "File ID is required" }, { status: 400 });

  try {
    // Fetch file as a stream
    const fileBuffer = await storage.getFileDownload(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET ?? "",
      fileId
    );

    return new Response(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileId}.pdf"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
