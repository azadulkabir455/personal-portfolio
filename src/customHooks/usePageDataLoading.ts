"use client";

import { useSyncExternalStore } from "react";
import { hasPendingLoads, subscribeToPendingLoads } from "./pageLoadingRegistry";

export function usePageDataLoading() {
  return useSyncExternalStore(subscribeToPendingLoads, hasPendingLoads, () => false);
}
