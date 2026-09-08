import { Readable } from "stream";
import { NextResponse } from "next/server";
import {
  buildPublicUrl,
  buildRemoteDir,
  buildUploadFilename,
  listRemoteFiles,
  remotePathFromUrl,
  withFtpClient,
} from "@/lib/ftp";
import { isUploadFolder } from "@/lib/uploadFolders";
import { getUploadValidationError } from "@/lib/uploadValidation";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const folder = new URL(request.url).searchParams.get("folder");

  if (typeof folder !== "string" || !isUploadFolder(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  const files = await listRemoteFiles(folder);
  return NextResponse.json({ files });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File) || typeof folder !== "string" || !isUploadFolder(folder)) {
    return NextResponse.json({ error: "Invalid upload request" }, { status: 400 });
  }

  const validationError = getUploadValidationError(file.name, file.size);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const filename = buildUploadFilename(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  await withFtpClient(async (client) => {
    await client.ensureDir(buildRemoteDir(folder));
    await client.uploadFrom(Readable.from(buffer), filename);
  });

  return NextResponse.json({ url: buildPublicUrl(folder, filename) });
}

export async function DELETE(request: Request) {
  const { url } = (await request.json()) as { url?: string };
  const remotePath = typeof url === "string" ? remotePathFromUrl(url) : null;

  if (!remotePath) {
    return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
  }

  await withFtpClient((client) => client.remove(remotePath));

  return NextResponse.json({ ok: true });
}
