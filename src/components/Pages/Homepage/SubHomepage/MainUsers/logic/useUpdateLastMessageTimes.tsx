import { useEffect, useState } from "react";
import { calculateTimeAgo } from "./calculateTimeAgo";
import { fetchLastMessageTimestamp } from "./fetchLastMessageTimestamp ";
import useFetchUserChats from "../../CreateChat/useFetchUserChats";

export const useUpdateLastMessageTimes = () => {
  const [lastMessageTimes, setLastMessageTimes] = useState<{
    [key: string]: string;
  }>({});
  const { chats } = useFetchUserChats();

  const updateLastMessageTimes = async (chatId: string) => {
    console.log(`Fetching timestamp for chatId: ${chatId}`);

    const timestamp = await fetchLastMessageTimestamp(chatId);

    if (timestamp) {
      const timeAgo = calculateTimeAgo(timestamp.toDate());

      setLastMessageTimes((prevTimes) => ({
        ...prevTimes,
        [chatId]: timeAgo,
      }));
      console.log(`Updated time ago for chat ${chatId}: ${timeAgo}`);
    } else {
      console.log(`No timestamp found for chatId: ${chatId}`);
    }
  };

  // Fetch os timestamps ao carregar os chats
  useEffect(() => {
    console.log("list chats", chats);
    if (chats.length > 0) {
      chats.forEach((chat) => {
        updateLastMessageTimes(chat.id);
      });
    }
  }, [chats]); // Só recarregar quando os `chats` mudarem

  return { lastMessageTimes, updateLastMessageTimes, chats };
};
