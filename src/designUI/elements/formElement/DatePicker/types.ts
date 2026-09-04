export interface DateRangeValue {
  from: string;
  to: string;
}

export interface DatePickerProps {
  id: string;
  label: string;
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  error?: string;
  placeholder?: string;
  containerClassName?: string;
}
