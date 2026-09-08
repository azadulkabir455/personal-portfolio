import type { RemoteFile, UploadFolder } from "@/lib/uploadFolders";

export async function uploadFile(file: File, folder: UploadFolder): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Upload failed");
  }

  const data = (await res.json()) as { url: string };
  return data.url;
}

export async function listFiles(folder: UploadFolder): Promise<RemoteFile[]> {
  const res = await fetch(`/api/upload?folder=${folder}`);
  if (!res.ok) throw new Error("Failed to load files");

  const data = (await res.json()) as { files: RemoteFile[] };
  return data.files;
}

export async function deleteFile(url: string): Promise<void> {
  try {
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch {
    // best-effort cleanup, safe to ignore
  }
}

export function cleanupReplacedFiles(
  previousUrls: Array<string | null | undefined>,
  nextUrls: Array<string | null | undefined>,
) {
  const nextSet = new Set(nextUrls.filter(Boolean) as string[]);
  for (const url of previousUrls) {
    if (url && !nextSet.has(url)) void deleteFile(url);
  }
}
