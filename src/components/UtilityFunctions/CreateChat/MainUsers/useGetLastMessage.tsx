import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../../../firebase";

export const useGetLastMessage = (chatId: string) => {
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "desc"),
      limit(1) // Limita para obter apenas a última mensagem
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const messageData = querySnapshot.docs[0].data();
        setLastMessage(messageData.text); // Ajuste se necessário para o campo correto
      } else {
        setLastMessage(null); // Se não houver mensagens
      }
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar
  }, [chatId]);

  return { lastMessage };
};
