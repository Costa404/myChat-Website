import { useEffect, useState } from "react";
import { useUser } from "../../Users/userContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

type Chat = {
  id: string;
  participants: string[];
};

const useFetchUserChats = () => {
  const { userId } = useUser();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchUserChats = async () => {
      if (!userId) return;

      try {
        const q = query(
          collection(db, "chats"),
          where("participants", "array-contains", userId)
        );

        const querySnapshot = await getDocs(q);
        const userChats: Chat[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Chat[];

        setChats(userChats);
      } catch (error) {
        console.error("Erro ao buscar os chats do usuário:", error);
      }
    };

    fetchUserChats();
  }, [userId]);
  return { chats };
};

export default useFetchUserChats;
