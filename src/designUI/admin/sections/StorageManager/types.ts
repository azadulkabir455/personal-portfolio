import type { RemoteFile, UploadFolder } from "@/lib/uploadFolders";

export const folderLabels: Record<UploadFolder, string> = {
  hero: "Hero",
  story: "Story",
  journey: "Journey",
  "recent-design": "Recent Design",
  "case-study": "Case Study",
  project: "Project",
  blog: "Blog",
  footer: "Footer",
  "personal-info": "Personal Info",
};

export interface StorageFolderCardProps {
  folder: UploadFolder;
  onSelect: (folder: UploadFolder) => void;
}

export interface StorageFileCardProps {
  file: RemoteFile;
  onView: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export interface StorageFileModalProps {
  file: RemoteFile | null;
  onClose: () => void;
  onDelete: (file: RemoteFile) => void;
  isDeleting: boolean;
}
