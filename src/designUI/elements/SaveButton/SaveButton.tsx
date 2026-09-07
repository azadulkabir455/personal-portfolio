import Button from "@/designUI/elements/Button/Button";
import type { SaveButtonProps } from "./types";

export default function SaveButton({ status, label = "Save Changes", className = "" }: SaveButtonProps) {
  return (
    <Button type="submit" disabled={status === "saving"} className={className}>
      {status === "saving" && (
        <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {status === "saving" ? "Saving..." : status === "saved" ? "Saved" : label}
    </Button>
  );
}
