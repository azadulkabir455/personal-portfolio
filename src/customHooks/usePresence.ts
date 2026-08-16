"use client";

import { useEffect } from "react";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { isRealtimeDbConfigured } from "@/firebase/config";
import { getRealtimeDb } from "@/firebase/realtimeDb";

export function usePresence() {
  useEffect(() => {
    if (!isRealtimeDbConfigured) return;

    const realtimeDb = getRealtimeDb();
    const clientId = crypto.randomUUID();
    const statusRef = ref(realtimeDb, `status/${clientId}`);
    const connectedRef = ref(realtimeDb, ".info/connected");

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        onDisconnect(statusRef)
          .remove()
          .then(() => set(statusRef, true));
      }
    });

    return () => {
      unsubscribe();
      set(statusRef, null);
    };
  }, []);
}
