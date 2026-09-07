import { getFirestore, initializeFirestore } from "firebase/firestore";
import { firebaseApp } from "./config";

let firestoreInstance: ReturnType<typeof getFirestore>;
try {
  firestoreInstance = initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
} catch {
  firestoreInstance = getFirestore(firebaseApp);
}

export const firestore = firestoreInstance;
