import { Client, FileInfo } from "basic-ftp";
import { type RemoteFile, type UploadFolder } from "@/lib/uploadFolders";

const OWNER = process.env.PORTFOLIO_OWNER ?? "";
const PUBLIC_BASE_URL = process.env.FILE_PUBLIC_BASE_URL ?? "";

export function buildRemoteDir(folder: UploadFolder) {
  return `${OWNER}/${folder}`;
}

export function buildPublicUrl(folder: UploadFolder, filename: string) {
  return `${PUBLIC_BASE_URL}/${OWNER}/${folder}/${filename}`;
}

export function remotePathFromUrl(url: string) {
  const marker = `${PUBLIC_BASE_URL}/`;
  return url.startsWith(marker) ? url.slice(marker.length) : null;
}

export function buildUploadFilename(originalName: string) {
  const dotIndex = originalName.lastIndexOf(".");
  const ext = dotIndex > -1 ? originalName.slice(dotIndex) : "";
  const base = originalName
    .slice(0, dotIndex > -1 ? dotIndex : undefined)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${Date.now()}-${base || "file"}${ext}`;
}

export async function withFtpClient<T>(run: (client: Client) => Promise<T>): Promise<T> {
  const client = new Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      port: Number(process.env.FTP_PORT ?? 21),
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true,
    });
    return await run(client);
  } finally {
    client.close();
  }
}

export async function listRemoteFiles(folder: UploadFolder): Promise<RemoteFile[]> {
  return withFtpClient(async (client) => {
    const dir = buildRemoteDir(folder);
    let entries: FileInfo[];
    try {
      entries = await client.list(dir);
    } catch {
      return [];
    }
    return entries
      .filter((entry) => entry.isFile)
      .map((entry) => ({
        name: entry.name,
        url: buildPublicUrl(folder, entry.name),
        size: entry.size,
        modifiedAt: entry.rawModifiedAt || null,
      }));
  });
}
