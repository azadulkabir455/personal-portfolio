export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
}

export interface UseConfirmDialogReturn {
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  openConfirm: (options: ConfirmDialogOptions) => void;
  closeConfirm: () => void;
  handleConfirm: () => void;
}

export type ConfirmDialogProps = UseConfirmDialogReturn;
