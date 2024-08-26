import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDA7PdT6Yoq-cnMupt098PPzcCQ_cTC4mA",
  authDomain: "fir-firstproject-71bad.firebaseapp.com",
  projectId: "fir-firstproject-71bad",
  storageBucket: "fir-firstproject-71bad.appspot.com",
  messagingSenderId: "115741666424",
  appId: "1:115741666424:web:97c60d4a51bf02c7c6d18d",
  measurementId: "G-23Y73E1SHZ",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firestore
const db = getFirestore(app);
export { db };

export const auth = getAuth(app);

export const fetchGames = async () => {
  const colRef = collection(db, "games");
  const snapshot = await getDocs(colRef);

  return { docs: snapshot.docs, colRef }; // Retorna os dados e a referência da coleção
};

export const AddPlayer = async (PlayerData: {
  player: string;
  goals: number;
}) => {
  const colRef = collection(db, "games");

  try {
    const docRef = await addDoc(colRef, PlayerData);
    console.log("Player added with Id:", docRef);
  } catch (error) {
    console.log("Error, try again", error);
  }
};

export const DeletePlayer = async (playerId: string) => {
  try {
    const docRef = doc(db, "games", playerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
      console.log("Player deleted with id:", playerId);
    } else {
      throw new Error(`"No player found with id:", ${playerId}`);
    }
  } catch (error) {
    console.log("Error, try again", error);
  }
};
