import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const useGetLastMessage = () => {
  const getLastMessage = async () => {
    try {
      const q = query(
        collection(db, "messages"),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Retorna o dado da última mensagem
        const lastMessage = querySnapshot.docs[0].data();
        console.log("Last message retrieved:", lastMessage);
        return lastMessage;
      } else {
        console.log("No messages found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching last message:", error);
      return null;
    }
  };

  return { getLastMessage };
};
