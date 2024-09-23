import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  Timestamp,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { useUser } from "../../Users/userContext";
import JSEncrypt from "jsencrypt"; // Biblioteca de criptografia

export interface MessageProps {
  id: string;
  text: string;
  userId: string;
  timestamp: Timestamp;
  chatId: string;
}

type useSendMessagesProps = {
  userId: string;
  chatId: string;
};

const useMessages = ({ userId, chatId }: useSendMessagesProps) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { setUserId } = useUser();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Função para descriptografar a mensagem
  const decryptMessage = (encryptedMessage: string, privateKey: string) => {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(privateKey);
    return decryptor.decrypt(encryptedMessage);
  };

  useEffect(() => {
    if (!userId || !chatId) {
      console.error("userId or chatId is missing");
      return;
    }

    // Recupere o userId personalizado do Firestore
    const fetchUserId = async () => {
      if (currentUser && currentUser.email) {
        const userDoc = await getDoc(doc(db, "users", currentUser.email));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserId(userData?.userId || "Unknown User");
        } else {
          console.log("User document not found for email:", currentUser.email);
          setUserId("Unknown User");
        }
      } else {
        console.log("No authenticated user found or email is null.");
      }
    };
    fetchUserId();

    // Consulta para obter mensagens filtradas pelo chatId
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp"),
      where("chatId", "==", chatId)
    );

    // Configura um ouvinte em tempo real para mensagens
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const messagesArray: MessageProps[] = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messagesArray.push({
          id: doc.id,
          ...(messageData as Omit<MessageProps, "id">),
        });
      });

      // Recupera a chave privada do localStorage
      const privateKey = localStorage.getItem("privateKey");
      console.log("Private key retrieved:", privateKey); // Adicione este log aqui

      if (!privateKey) {
        console.error("Private key is not available in localStorage.");
        return;
      }

      // Descriptografa as mensagens
      const decryptedMessages = messagesArray.map((msg) => {
        const decryptedText = decryptMessage(msg.text, privateKey);

        if (!decryptedText) {
          console.error("Decryption failed for message:", msg.text);
        }
        return { ...msg, text: decryptedText || "Error decrypting message" };
      });

      setMessages(decryptedMessages);
    });

    // Limpa o ouvinte quando o componente é desmontado
    return () => unsubscribe();
  }, [chatId, userId, setUserId, currentUser]);

  return { messages, userId, chatId };
};

export default useMessages;
