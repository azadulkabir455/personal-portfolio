type Listener = () => void;

export const criticalSectionIds = new Set(["hero", "story", "feature", "topbar", "personalInfo", "homeSections"]);

const pending = new Set<symbol>();
const listeners = new Set<Listener>();
let hasStarted = false;

function notify() {
  listeners.forEach((listener) => listener());
}

export function registerPendingLoad(): symbol {
  const token = Symbol();
  hasStarted = true;
  pending.add(token);
  notify();
  return token;
}

export function resolvePendingLoad(token: symbol) {
  if (pending.delete(token)) notify();
}

export function hasPendingLoads() {
  return !hasStarted || pending.size > 0;
}

export function subscribeToPendingLoads(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
