import { useEffect, useState } from "react";
import { useFetchChatIds } from "./useFetchUserChat";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const useUnreadMessages = (userId: string) => {
  // Em vez de usar apenas um número, vamos usar um objeto para armazenar a contagem por chatId
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const { loading, chatIds } = useFetchChatIds(userId);

  useEffect(() => {
    if (!userId || loading || !chatIds.length) {
      console.warn(
        "⚠️ Hold up, we can't proceed! userId:",
        userId,
        "loading:",
        loading,
        "chatIds:",
        chatIds
      );
      return;
    }

    // Limpa listeners ao mudar de usuário ou ao desmontar o componente
    const unsubscribes: (() => void)[] = [];

    chatIds.forEach((chatId) => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "messages"),
          where("chatId", "==", chatId),
          where("userId", "!=", userId),
          where("read", "==", false)
        ),
        (snapshot) => {
          const unreadMessages = snapshot.size;
          // console.log(
          //   `Contador de mensagens não lidas para o chat ${chatId}: ${unreadMessages}`
          // );
          // Atualiza a contagem de mensagens não lidas apenas para este chatId
          setUnreadCounts((prevCounts) => ({
            ...prevCounts,
            [chatId]: unreadMessages,
          }));
        }
      );

      // Marca mensagens como lidas quando o chat é aberto

      // Adiciona o unsubscribe para limpar o listener depois
      unsubscribes.push(unsubscribe);
    });

    // Limpa todos os listeners ao desmontar o componente ou ao mudar o userId
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [userId, chatIds, loading]);

  return { unreadCounts, loading }; // Retorna um objeto de contagem por chatId
};
