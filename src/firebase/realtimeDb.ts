import { getDatabase } from "firebase/database";
import { firebaseApp } from "./config";

export function getRealtimeDb() {
  return getDatabase(firebaseApp);
}
