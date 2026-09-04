export interface EditableLabelRowProps {
  label: string;
  count?: number;
  size?: "md" | "sm";
  onRename: (label: string) => void;
  onRemove: () => void;
}
