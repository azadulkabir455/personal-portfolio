import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "./config";

export function getFirebaseAuth() {
  return getAuth(firebaseApp);
}

export const googleProvider = new GoogleAuthProvider();
