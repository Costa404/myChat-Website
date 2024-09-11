import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase"; // Ajuste o caminho conforme necessário
import { useError } from "../../errorContext/useError";
import { useUser } from "../../Users/userContext";
type useSendMessagesProps = {
  chatId: string;
  userId: string;
};

const useSendMessage = ({ chatId, userId }: useSendMessagesProps) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { setError } = useError();
  const { userId: contextUserId } = useUser();
  const finalUserId = userId || contextUserId; // Usa userId do contexto se não for passado como prop.

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim() === "" || !finalUserId) {
      console.log("Message or userId is empty, returning early.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: Timestamp.now(),
        userId: finalUserId,
        chatId: chatId,
      });

      if (!chatId) {
        return;
      }

      setNewMessage("");
    } catch (error) {
      console.error("Error adding message: ", error);
      setError("Failed to send message. Please try again.");
    }
  };

  return {
    newMessage,
    setNewMessage,
    sendMessage,
  };
};

export default useSendMessage;
