export function resolveStringValue(value: File | string | null | undefined, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}
