import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";

export const useGetEmailFromUsername = () => {
  // const { userName } = useFetchFriendName();

  const getEmailFromUsername = async (userName: string) => {
    try {
      const userCollection = collection(db, "users");

      const q = query(userCollection, where("userId", "==", userName));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("E-mail não encontrado para o username:", userName);
        return null;
      }

      // Obtém o e-mail do primeiro documento encontrado
      let email;
      querySnapshot.forEach((doc) => {
        email = doc.id; // O id do documento é o e-mail
      });

      return email;
    } catch (error) {
      console.error("Erro ao buscar o e-mail do username:", error);
      return null;
    }
  };
  return { getEmailFromUsername };
};
