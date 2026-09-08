export const UPLOAD_FOLDERS = [
  "hero",
  "story",
  "journey",
  "recent-design",
  "case-study",
  "project",
  "blog",
  "footer",
  "personal-info",
] as const;

export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

export interface RemoteFile {
  name: string;
  url: string;
  size: number;
  modifiedAt: string | null;
}
