import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./firestore";
import type { BlogPost } from "@/designUI/utilities/content/blog";

const POSTS_COLLECTION = "posts";

type DashboardPost = BlogPost & { id: string; published?: boolean };
type PostInput = BlogPost;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(firestore, POSTS_COLLECTION),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as BlogPost) }));
}

export async function getPostBySlug(href: string): Promise<DashboardPost | null> {
  const q = query(collection(firestore, POSTS_COLLECTION), where("href", "==", href));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...(d.data() as BlogPost) };
}

export async function getPostById(id: string): Promise<DashboardPost | null> {
  const snapshot = await getDoc(doc(firestore, POSTS_COLLECTION, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...(snapshot.data() as BlogPost) };
}

export async function getAllPostsForDashboard(): Promise<DashboardPost[]> {
  const q = query(collection(firestore, POSTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as BlogPost) }));
}

export async function createPost(values: PostInput) {
  return addDoc(collection(firestore, POSTS_COLLECTION), {
    published: true,
    ...values,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePost(id: string, values: Partial<PostInput>) {
  const ref = doc(firestore, POSTS_COLLECTION, id);
  const existing = await getDoc(ref);
  if (!existing.exists()) throw new Error("Post not found");
  return updateDoc(ref, { ...values, updatedAt: serverTimestamp() });
}

export async function deletePost(id: string) {
  return deleteDoc(doc(firestore, POSTS_COLLECTION, id));
}
