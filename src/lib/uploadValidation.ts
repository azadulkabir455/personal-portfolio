export const MAX_UPLOAD_SIZE_BYTES = 3 * 1024 * 1024;
export const ALLOWED_UPLOAD_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".pdf"];

export function getUploadValidationError(filename: string, size: number): string | null {
  const dotIndex = filename.lastIndexOf(".");
  const ext = dotIndex > -1 ? filename.toLowerCase().slice(dotIndex) : "";

  if (!ALLOWED_UPLOAD_EXTENSIONS.includes(ext)) {
    return "Only PNG, JPG, JPEG, WEBP or PDF files are allowed.";
  }
  if (size > MAX_UPLOAD_SIZE_BYTES) {
    return "File must be 3MB or smaller.";
  }
  return null;
}
