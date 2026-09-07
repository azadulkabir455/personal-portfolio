"use client";

import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "@/firebase/config";
import { registerPendingLoad, resolvePendingLoad } from "./pageLoadingRegistry";

export function useFirestoreCollection<T>(fetcher: () => Promise<T[]>, fallback: T[]) {
  const [data, setData] = useState<T[]>(fallback);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const token = registerPendingLoad();

    fetcher()
      .then((items) => {
        if (items.length) setData(items);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        resolvePendingLoad(token);
      });

    return () => resolvePendingLoad(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading };
}
