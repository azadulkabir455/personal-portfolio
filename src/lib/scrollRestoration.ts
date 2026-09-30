import type Lenis from "lenis";

const storageKeyPrefix = "scroll-position:";
const restoreTimeout = 8000;

function readSavedPosition(key: string) {
  try {
    const value = sessionStorage.getItem(key);
    return value === null ? null : Number(value);
  } catch {
    return null;
  }
}

function savePosition(key: string, value: number) {
  try {
    sessionStorage.setItem(key, String(value));
  } catch {}
}

function isReloadOrHistoryNavigation() {
  const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return entry?.type === "reload" || entry?.type === "back_forward";
}

export function setupScrollRestoration(lenis: Lenis) {
  history.scrollRestoration = "manual";

  const handlePageHide = () => savePosition(storageKeyPrefix + location.pathname, window.scrollY);
  window.addEventListener("pagehide", handlePageHide);

  const target = isReloadOrHistoryNavigation()
    ? readSavedPosition(storageKeyPrefix + location.pathname)
    : null;

  if (!target) {
    lenis.scrollTo(0, { immediate: true, force: true });
    return () => window.removeEventListener("pagehide", handlePageHide);
  }

  const stopEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  let isDone = false;

  const tryRestore = () => {
    if (isDone) return;
    lenis.resize();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    lenis.scrollTo(Math.min(target, maxScroll), { immediate: true, force: true });
    if (maxScroll >= target) finish();
  };

  const resizeObserver = new ResizeObserver(tryRestore);

  const finish = () => {
    isDone = true;
    resizeObserver.disconnect();
    clearTimeout(timeout);
    stopEvents.forEach((event) => window.removeEventListener(event, finish));
  };

  const timeout = setTimeout(finish, restoreTimeout);
  stopEvents.forEach((event) => window.addEventListener(event, finish, { passive: true }));
  resizeObserver.observe(document.body);
  tryRestore();

  return () => {
    finish();
    window.removeEventListener("pagehide", handlePageHide);
  };
}
