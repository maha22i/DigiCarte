import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUB20JtsVttRcOvk4br7mPTx8CmKuDoq4",
  authDomain: "digicarte-e6013.firebaseapp.com",
  projectId: "digicarte-e6013",
  storageBucket: "digicarte-e6013.firebasestorage.app",
  messagingSenderId: "148436318117",
  appId: "1:148436318117:web:bb44d8006c2e3181529a4c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);