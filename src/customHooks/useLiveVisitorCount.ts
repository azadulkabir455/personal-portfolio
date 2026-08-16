"use client";

import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { isRealtimeDbConfigured } from "@/firebase/config";
import { getRealtimeDb } from "@/firebase/realtimeDb";

export function useLiveVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRealtimeDbConfigured) return;

    const statusRef = ref(getRealtimeDb(), "status");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return count;
}
