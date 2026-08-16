"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { isFirebaseConfigured } from "@/firebase/config";
import { firestore } from "@/firebase/firestore";

const CONTENT_COLLECTION = "content";

export function useSectionContent<T>(sectionId: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    getDoc(doc(firestore, CONTENT_COLLECTION, sectionId))
      .then((snapshot) => {
        if (snapshot.exists()) setData(snapshot.data() as T);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [sectionId]);

  return { data, isLoading };
}
