import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDA7PdT6Yoq-cnMupt098PPzcCQ_cTC4mA",
  authDomain: "fir-firstproject-71bad.firebaseapp.com",
  projectId: "fir-firstproject-71bad",
  storageBucket: "fir-firstproject-71bad.appspot.com",
  messagingSenderId: "115741666424",
  appId: "1:115741666424:web:97c60d4a51bf02c7c6d18d",
  measurementId: "G-23Y73E1SHZ",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage };
