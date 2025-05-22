import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSWVbh4vSXeu7pgCKo5Ddqw2ivKE--Kfw",
  authDomain: "final-proj-ece01.firebaseapp.com",
  projectId: "final-proj-ece01",
  storageBucket: "final-proj-ece01.firebasestorage.app",
  messagingSenderId: "826171583332",
  appId: "1:826171583332:web:0dada8ea3b1caadf8d6871"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };