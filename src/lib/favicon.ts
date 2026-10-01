export function applyFavicon(url: string) {
  document.querySelectorAll("link[rel~='icon']").forEach((link) => link.remove());
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = url;
  document.head.appendChild(link);
}
