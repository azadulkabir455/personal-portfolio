import type { RemoteFile, UploadFolder } from "@/lib/uploadFolders";

export function uploadFile(
  file: File,
  folder: UploadFolder,
  onProgress?: (percent: number) => void,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      let body: { url?: string; error?: string } | null = null;
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        // ignore invalid JSON, handled by the status check below
      }

      if (xhr.status >= 200 && xhr.status < 300 && body?.url) {
        resolve(body.url);
      } else {
        reject(new Error(body?.error ?? "Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));

    xhr.send(formData);
  });
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
