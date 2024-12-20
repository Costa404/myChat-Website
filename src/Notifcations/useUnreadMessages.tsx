import { useEffect, useState } from "react";
import { useFetchChatIds } from "./useFetchUserChat";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const useUnreadMessages = (userId: string) => {
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

          setUnreadCounts((prevCounts) => ({
            ...prevCounts,
            [chatId]: unreadMessages,
          }));
        }
      );

      unsubscribes.push(unsubscribe);
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [userId, chatIds, loading]);

  return { unreadCounts, loading };
};
