// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

// Inicialize o Auth
const auth = getAuth(app);

// Inicialize o Storage
const storage = getStorage(app);

// Exporta os serviços
export { db, auth, storage };

// export const fetchGames = async () => {
//   const colRef = collection(db, "games");
//   const snapshot = await getDocs(colRef);

//   return { docs: snapshot.docs, colRef }; // Retorna os dados e a referência da coleção
// };
