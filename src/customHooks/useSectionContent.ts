"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { isFirebaseConfigured } from "@/firebase/config";
import { firestore } from "@/firebase/firestore";
import { registerPendingLoad, resolvePendingLoad } from "./pageLoadingRegistry";

const CONTENT_COLLECTION = "content";

export function useSectionContent<T>(sectionId: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const token = registerPendingLoad();

    getDoc(doc(firestore, CONTENT_COLLECTION, sectionId))
      .then((snapshot) => {
        if (snapshot.exists()) setData({ ...fallback, ...(snapshot.data() as Partial<T>) });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        resolvePendingLoad(token);
      });

    return () => resolvePendingLoad(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  return { data, isLoading };
}
