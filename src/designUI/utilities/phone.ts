import { toast } from "react-toastify";

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `88${digits}` : digits;
}

export function toTelLink(phone: string): string {
  return `tel:+${normalizePhone(phone)}`;
}

export function handleTelLinkClick(event: React.MouseEvent, phone: string) {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  event.preventDefault();
  navigator.clipboard
    .writeText(`+${normalizePhone(phone)}`)
    .then(() => toast.success("Phone number copied"))
    .catch(() => {});
}
