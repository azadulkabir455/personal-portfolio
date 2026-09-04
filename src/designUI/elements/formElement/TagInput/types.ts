export interface TagInputProps {
  id: string;
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  error?: string;
  containerClassName?: string;
}
