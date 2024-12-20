import { useEffect, useState } from "react";
import { fetchLastMessageTimestamp } from "../logic/fetchLastMessageTimestamp ";

const useFetchLastMessage = (chatIds: string[]) => {
  const [lastMessage, setLastMessage] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLastMessage = async () => {
      if (!chatIds || chatIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const messages = await Promise.all(
          chatIds.map((chatId) => fetchLastMessageTimestamp(chatId))
        );

        const lastMessages = messages.filter((msg) => msg);
        if (lastMessages.length > 0) {
          const lastMsgTimestamp = lastMessages[lastMessages.length - 1];
          setLastMessage(lastMsgTimestamp.toDate());
        } else {
          setLastMessage(null);
        }
      } catch (error) {
        console.error("Error fetching last message:", error);
      } finally {
        setLoading(false);
      }
    };

    getLastMessage();
  }, [chatIds]); // Mudei as dependências para incluir apenas chatIds

  return { lastMessage, loading };
};

export default useFetchLastMessage;
