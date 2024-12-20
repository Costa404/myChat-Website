import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export const useFetchUserChat = async (userId: string) => {
  const chatRef = collection(db, "chats");
  const q = query(chatRef, where("participants", "array-contains", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.id);
};

export const useFetchChatIds = (userId: string) => {
  const [chatIds, setChatIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const chats = useFetchUserChat(userId);
  useEffect(() => {
    const fetchChatIds = async () => {
      setChatIds(await chats);
      setLoading(false);
    };

    fetchChatIds();
  }, [userId]);
  return { chatIds, loading };
};
