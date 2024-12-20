import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../../../../firebase";

interface Chat {
  id: string;
  participants: string[];
  createdAt: Date;
  lastMessageTime?: string;
}

const convertToChat = (doc: DocumentData): Omit<Chat, "id"> => {
  return {
    participants: doc.participants as string[],
    createdAt: doc.createdAt.toDate(),
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
          ...convertToChat(doc.data()),
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
