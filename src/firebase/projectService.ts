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
  type FieldValue,
} from "firebase/firestore";
import { firestore } from "./firestore";
import type { FeaturedProject } from "@/designUI/utilities/content/featuredProjects";

const PROJECTS_COLLECTION = "projects";

type DashboardProject = FeaturedProject & { id: string; published?: boolean };
type ProjectInput = Omit<FeaturedProject, "id">;
type ProjectUpdateInput = { [K in keyof ProjectInput]?: ProjectInput[K] | FieldValue };

export async function getFeaturedProjectsForPublic(): Promise<FeaturedProject[]> {
  const q = query(
    collection(firestore, PROJECTS_COLLECTION),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ ...(d.data() as FeaturedProject), id: d.id }));
}

export async function getProjectById(id: string): Promise<DashboardProject | null> {
  const snapshot = await getDoc(doc(firestore, PROJECTS_COLLECTION, id));
  if (!snapshot.exists()) return null;
  return { ...(snapshot.data() as FeaturedProject), id: snapshot.id };
}

export async function getAllProjectsForDashboard(): Promise<DashboardProject[]> {
  const q = query(collection(firestore, PROJECTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ ...(d.data() as FeaturedProject), id: d.id }));
}

export async function createProject(values: ProjectInput) {
  return addDoc(collection(firestore, PROJECTS_COLLECTION), {
    published: true,
    ...values,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProject(id: string, values: ProjectUpdateInput) {
  const ref = doc(firestore, PROJECTS_COLLECTION, id);
  const existing = await getDoc(ref);
  if (!existing.exists()) throw new Error("Project not found");
  return updateDoc(ref, { ...values, updatedAt: serverTimestamp() });
}

export async function deleteProject(id: string) {
  return deleteDoc(doc(firestore, PROJECTS_COLLECTION, id));
}
