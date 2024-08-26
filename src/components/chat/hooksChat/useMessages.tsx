import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase"; // Ajuste o caminho conforme necessário
import { getAuth } from "firebase/auth";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp: Timestamp;
}

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // Define o usuário atual
    if (currentUser) {
      setUser(currentUser.email || "Unknown User");
    }

    // Consulta para obter mensagens em ordem crescente
    const q = query(collection(db, "messages"), orderBy("timestamp"));

    // Configura um ouvinte em tempo real para mensagens
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray: Message[] = [];
      querySnapshot.forEach((doc) => {
        messagesArray.push({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">), // Exclui "id" da tipagem dos dados
        });
      });
      setMessages(messagesArray);
    });

    // Limpa o ouvinte quando o componente é desmontado
    return () => unsubscribe();
  }, []); // Dependências ajustadas

  return { messages, user };
};

export default useMessages;
