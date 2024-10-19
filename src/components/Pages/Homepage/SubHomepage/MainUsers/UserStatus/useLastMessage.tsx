import { useEffect, useState } from "react";
import { useFetchChatIds } from "../../../../../../Notifcations/useFetchUserChat";
import useFetchLastMessage from "./useFetchLastMessage";

const useLastMessage = (userId: string) => {
  const { chatIds, loading: chatLoading } = useFetchChatIds(userId);
  const { lastMessage, loading: messageLoading } = useFetchLastMessage(chatIds);
  const [loading, setLoading] = useState(false);
  console.log("chatUdsSSSSSSSSSSSSS", chatIds);
  useEffect(() => {
    if (!chatIds) {
      console.log("Error: chatId is undefined");
      return;
    }
    if (chatLoading || messageLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [chatLoading, messageLoading]);

  return { lastMessage, loading };
};

export default useLastMessage;
