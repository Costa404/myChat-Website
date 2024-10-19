import { useState } from "react";

import { addDoc, collection, Timestamp } from "firebase/firestore";

import useFetchFriendName from "./useFetchFriendName"; // Pegar nome do amigo
import { useError } from "../../../../errorContext/useError";
import { useUser } from "../../../../Users/userContext";
import { db } from "../../../../../firebase";

type useSendMessagesProps = {
  chatId: string;
  userId?: string; // userId ainda opcional
};

const useSendMessage = ({ chatId }: useSendMessagesProps) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { setError } = useError();
  const { userId: currentUserId } = useUser(); // ID do usuário autenticado
  const { userName } = useFetchFriendName(); // Pegar o nome do amigo

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim() === "" || !userName) {
      console.log("Message or userName is empty, returning early.");
      return;
    }

    try {
      // Adicionando a mensagem diretamente sem encriptação
      await addDoc(collection(db, "messages"), {
        text: newMessage, // Mensagem não encriptada
        timestamp: Timestamp.now(),
        userId: currentUserId,
        chatId: chatId,
        receiver: userName,
        read: false,
      });

      console.log("Message sent successfully.");
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
      setError("Failed to send message. Please try again.");
    }
  };

  return { sendMessage, newMessage, setNewMessage };
};

export default useSendMessage;
