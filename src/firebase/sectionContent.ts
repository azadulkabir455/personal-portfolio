import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "./firestore";

const CONTENT_COLLECTION = "content";

export async function saveSectionContent<T extends object>(sectionId: string, data: T) {
  await setDoc(doc(firestore, CONTENT_COLLECTION, sectionId), data, { merge: true });
}

export async function getAllSectionContentDocs(): Promise<Record<string, unknown>[]> {
  const snapshot = await getDocs(collection(firestore, CONTENT_COLLECTION));
  return snapshot.docs.map((d) => d.data());
}
