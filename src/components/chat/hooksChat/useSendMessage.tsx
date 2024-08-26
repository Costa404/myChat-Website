import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase"; // Ajuste o caminho conforme necessário

const useSendMessage = (user: string | null) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim() === "" || !user) return;

    try {
      // Adiciona a nova mensagem ao Firestore
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        user: user,
        timestamp: Timestamp.now(),
      });
      setNewMessage(""); // Limpa o campo de nova mensagem
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return {
    newMessage,
    setNewMessage,
    sendMessage,
  };
};

export default useSendMessage;
