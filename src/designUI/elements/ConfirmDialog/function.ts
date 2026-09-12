"use client";

import { useCallback, useState } from "react";
import type { ConfirmDialogOptions, UseConfirmDialogReturn } from "./types";

interface ConfirmDialogState extends ConfirmDialogOptions {
  isOpen: boolean;
  isLoading: boolean;
}

const closedState: ConfirmDialogState = {
  isOpen: false,
  isLoading: false,
  title: "",
  message: "",
  onConfirm: () => {},
};

export function useConfirmDialog(): UseConfirmDialogReturn {
  const [state, setState] = useState<ConfirmDialogState>(closedState);

  const openConfirm = useCallback((options: ConfirmDialogOptions) => {
    setState({ isOpen: true, isLoading: false, ...options });
  }, []);

  const closeConfirm = useCallback(() => {
    setState(closedState);
  }, []);

  const handleConfirm = useCallback(() => {
    setState((current) => ({ ...current, isLoading: true }));
    void Promise.resolve(state.onConfirm()).finally(() => setState(closedState));
  }, [state]);

  return {
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    title: state.title,
    message: state.message,
    confirmLabel: state.confirmLabel ?? "Delete",
    cancelLabel: state.cancelLabel ?? "Cancel",
    openConfirm,
    closeConfirm,
    handleConfirm,
  };
}
