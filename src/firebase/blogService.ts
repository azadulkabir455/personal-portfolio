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

const POSTS_COLLECTION = "posts";

export async function getPublishedPosts(): Promise<any[]> {
  const q = query(
    collection(firestore, POSTS_COLLECTION),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as any);
}

export async function getPostBySlug(slug: string): Promise<any | null> {
  const q = query(collection(firestore, POSTS_COLLECTION), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() } as any;
}

export async function getPostById(id: string): Promise<any | null> {
  const snapshot = await getDoc(doc(firestore, POSTS_COLLECTION, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as any;
}

export async function getAllPostsForDashboard(): Promise<any[]> {
  const q = query(collection(firestore, POSTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as any);
}

export async function createPost(values: any) {
  return addDoc(collection(firestore, POSTS_COLLECTION), {
    ...values,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updatePost(id: string, values: any) {
  const ref = doc(firestore, POSTS_COLLECTION, id);
  const existing = await getDoc(ref);
  if (!existing.exists()) throw new Error("Post not found");
  return updateDoc(ref, { ...values, updatedAt: serverTimestamp() });
}

export async function deletePost(id: string) {
  return deleteDoc(doc(firestore, POSTS_COLLECTION, id));
}
