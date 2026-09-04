export interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

export interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  containerClassName?: string;
}
