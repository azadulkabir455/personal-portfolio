type Listener = () => void;

const pending = new Set<symbol>();
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function registerPendingLoad(): symbol {
  const token = Symbol();
  pending.add(token);
  notify();
  return token;
}

export function resolvePendingLoad(token: symbol) {
  if (pending.delete(token)) notify();
}

export function hasPendingLoads() {
  return pending.size > 0;
}

export function subscribeToPendingLoads(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
