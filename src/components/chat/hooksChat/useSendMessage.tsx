import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase"; // Ajuste o caminho conforme necessário
import { useError } from "../../errorContext/useError";

const useSendMessage = (userId: string | null) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { setError } = useError();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("sendMessage called with:", newMessage, userId);

    if (newMessage.trim() === "" || !userId) {
      console.log("Message or userId is empty, returning early.");
      return;
    }

    try {
      // Adiciona a nova mensagem ao Firestore
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: Timestamp.now(),
        userId: userId,
      });
      console.log("Message sent successfully.");
      setNewMessage(""); // Limpa o campo de nova mensagem
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
