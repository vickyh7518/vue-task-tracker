import db from "./firebaseInit";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  Timestamp,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

class Tasks {
  getAll() {
    const snapshot = getDocs(collection(db, "tasks"));
    return snapshot;
  }

  async getOne(key) {
    const snapshot = doc(db, "tasks", key);
    const docSnap = await getDoc(snapshot);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async create(task) {
    task.day = Timestamp.fromDate(new Date(task.day));
    task.create = serverTimestamp();
    const snapshot = collection(db, "tasks");
    return await addDoc(snapshot, task);
  }

  async update(key, value) {
    const snapshot = doc(db, "tasks", key);
    return await updateDoc(snapshot, value);
  }

  async delete(key) {
    return await deleteDoc(doc(db, "tasks", key));
  }
}

export default new Tasks();
