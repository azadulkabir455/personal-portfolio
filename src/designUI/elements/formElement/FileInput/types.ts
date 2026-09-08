import type { UploadFolder } from "@/lib/uploadFolders";

export interface FileInputProps {
  label: string;
  error?: string;
  value?: string | null;
  onChange: (url: string | null) => void;
  folder: UploadFolder;
  accept?: string;
  hint?: string;
  containerClassName?: string;
}
