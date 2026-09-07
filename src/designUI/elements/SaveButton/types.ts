import type { SaveStatus } from "@/customHooks/useSaveStatus";

export interface SaveButtonProps {
  status: SaveStatus;
  label?: string;
  className?: string;
}
