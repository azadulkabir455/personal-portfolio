export interface TagSelectProps {
  id: string;
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  options: string[];
  error?: string;
  containerClassName?: string;
}
