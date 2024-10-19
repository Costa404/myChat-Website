import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../../../../firebase";

interface Chat {
  id: string;
  participants: string[]; // Ajuste os campos conforme sua estrutura
  createdAt: Date;
  lastMessageTime?: string;
}

// Crie uma função para converter dados do Firestore no tipo Chat
const convertToChat = (doc: DocumentData): Omit<Chat, "id"> => {
  return {
    participants: doc.participants as string[], // Ajuste o tipo conforme sua estrutura
    createdAt: doc.createdAt.toDate(), // Converta para um objeto Date se necessário
  };
};

const ChatListComponent: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatCollection = collection(db, "chat");
        const chatSnapshot = await getDocs(chatCollection);
        const chatList = chatSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...convertToChat(doc.data()), // Use a função de conversão aqui
        }));
        setChats(chatList);
      } catch (error) {
        console.error("Erro ao buscar chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListComponent;
