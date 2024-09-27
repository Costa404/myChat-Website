import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useGetEmailFromUsername } from "../hooksChat/useGetEmailFromUsername ";

export const useFetchPublicKey = (userId: string) => {
  const { getEmailFromUsername } = useGetEmailFromUsername(); // Aqui você usa seu hook para obter o email

  console.log("Calling fetchPublicKey with userId:", userId);

  const fetchPublicKey = async () => {
    if (!userId) {
      console.error("Username is undefined. Cannot fetch public key.");
      return null;
    }
    console.log("Calling fetchPublicKey with userId:", userId);

    const userEmail = await getEmailFromUsername(userId);

    console.log("fuckkkkkkkkkkkk", userId);

    try {
      console.log("Fetching email for userId:", userEmail);
      // Busca o email usando o userEmail

      if (!userEmail) {
        console.error("UserId (email) is undefined. Cannot fetch public key.");
        return null;
      }

      console.log("Fetching public key for userEmail (email):", userEmail);
      const docRef = doc(db, "users", userEmail); // Usa o userEmail diretamente como o identificador do documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const publicKey = docSnap.data().publicKey; // Acessa a chave pública
        console.log("Public key found:", publicKey);
        return publicKey;
      } else {
        console.error("Public key not found for userEmail:", userEmail);
        return null;
      }
    } catch (error) {
      console.error(
        "Error fetching public key for userEmail:",
        userEmail,
        error
      );
      return null;
    }
  };

  return { fetchPublicKey };
};
