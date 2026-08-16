"use client";

import { useEffect, useState } from "react";
import { getPostById } from "@/firebase/blogService";

export function useEditPost(id: string) {
  const [post, setPost] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPostById(id)
      .then(setPost)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { post, isLoading };
}
