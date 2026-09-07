import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firestore";

const CONTENT_COLLECTION = "content";

export async function saveSectionContent<T extends object>(sectionId: string, data: T) {
  await setDoc(doc(firestore, CONTENT_COLLECTION, sectionId), data, { merge: true });
}
