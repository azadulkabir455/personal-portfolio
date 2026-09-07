"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useSaveStatus() {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const run = useCallback(async (action: () => Promise<void>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus("saving");
    try {
      await action();
      setStatus("saved");
      toast.success("Saved successfully", { progressClassName: "!bg-black" });
      timeoutRef.current = setTimeout(() => setStatus("idle"), 2500);
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Failed to save. Please try again.", { progressClassName: "!bg-black" });
    }
  }, []);

  return { status, run };
}
