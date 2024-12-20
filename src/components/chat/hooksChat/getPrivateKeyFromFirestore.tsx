import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

// Função para buscar a chave privada do Firestore
export const getPrivateKeyFromFirestore = async (email: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", email));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const privateKey = userData?.privateKey;
      if (privateKey) {
        return privateKey;
      } else {
        console.error("Private key not found in the user document.");
        return null;
      }
    } else {
      console.error("User document not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching private key:", error);
    return null;
  }
};
