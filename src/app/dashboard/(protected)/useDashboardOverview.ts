"use client";

import { useEffect, useState } from "react";
import {
  deletePost,
  getAllPostsForDashboard,
} from "@/firebase/blogService";

export function useDashboardOverview() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllPostsForDashboard()
      .then(setPosts)
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return { posts, isLoading, handleDelete };
}
