"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

const toastBaseClassName =
  "!rounded-[12px] !min-h-0 !items-center !border !border-l-4 !bg-white !py-4 !pl-4 !pr-3 !text-[#171717] !shadow-lg !font-sans !text-[13px] !font-semibold";

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
      toast.success("Saved successfully", {
        className: `${toastBaseClassName} !border-[#BEE3D4] !border-l-[#1AA179]`,
        progressClassName: "!bg-[#1AA179]",
      });
      timeoutRef.current = setTimeout(() => setStatus("idle"), 2500);
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Failed to save. Please try again.", {
        className: `${toastBaseClassName} !border-[#F6CDCF] !border-l-[#E5484D]`,
        progressClassName: "!bg-[#E5484D]",
      });
    }
  }, []);

  return { status, run };
}
