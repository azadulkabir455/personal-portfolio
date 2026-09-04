export interface RichTextEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (html: string) => void;
  error?: string;
  containerClassName?: string;
}
