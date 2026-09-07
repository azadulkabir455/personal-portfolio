"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@/designUI/utilities/icons/icon/CloseIcon";

const toastClassName =
  "!min-h-0 !items-center !overflow-hidden !rounded-full !bg-white !py-[15px] !pl-[20px] !pr-9 !font-sans !text-[14px] !font-semibold !text-[#171717] !shadow-[0px_4px_20px_rgba(0,0,0,0.1)]";

function ToastCloseButton({ closeToast }: { closeToast: () => void }) {
  return (
    <button
      type="button"
      onClick={closeToast}
      aria-label="Close"
      className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-black/5 transition-colors duration-200 hover:bg-black/10"
    >
      <CloseIcon width={9} height={9} color="#171717" />
    </button>
  );
}

export default function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
      toastClassName={toastClassName}
      closeButton={ToastCloseButton}
      className="!w-auto !max-w-[360px]"
    />
  );
}
