export interface FileInputProps {
  label: string;
  error?: string;
  value?: string | File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  hint?: string;
  containerClassName?: string;
}
