"use client";

import { useSyncExternalStore } from "react";
import { isFirebaseConfigured } from "@/firebase/config";
import { hasPendingLoads, subscribeToPendingLoads } from "./pageLoadingRegistry";

export function usePageDataLoading() {
  const isPending = useSyncExternalStore(subscribeToPendingLoads, hasPendingLoads, () => true);
  return isFirebaseConfigured && isPending;
}
