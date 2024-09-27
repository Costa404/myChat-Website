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
import { db } from "../../../../firebase";
import { getAuth } from "firebase/auth";
import { useUser } from "../../../Users/userContext";

import { useDecryptMessage } from "../../chatLogic/UtilityFunctionsChat/useEncryptAndDecryptMessage";
import { useFetchPrivateKey } from "../../chatLogic/UtilityFunctionsChat/useFetchPrivateKey";

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
  const { fetchPrivateKey } = useFetchPrivateKey(userId);
  const { decryptMessage } = useDecryptMessage(userId);

  useEffect(() => {
    const fetchUserId = async () => {
      if (currentUser && currentUser.email) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.email));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserId(userData?.userId || "Unknown User");
          } else {
            console.error(
              "User document not found for email:",
              currentUser.email
            );
            setUserId("Unknown User");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        console.log("No authenticated user found or email is null.");
      }
    };

    fetchUserId();
  }, [currentUser, setUserId]);

  useEffect(() => {
    if (!userId || !chatId) {
      console.error("userId or chatId is missing");
      return;
    }

    const q = query(
      collection(db, "messages"),
      orderBy("timestamp"),
      where("chatId", "==", chatId)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const messagesArray: MessageProps[] = [];

      for (const doc of querySnapshot.docs) {
        const messageData = doc.data();
        messagesArray.push({
          id: doc.id,
          ...(messageData as Omit<MessageProps, "id">),
        });
      }

      // Obtém a chave privada antes de descriptografar as mensagens
      const privateKey = await fetchPrivateKey(); // Chama a função para obter a chave privada
      // console.log("Private key:", privateKey);

      // Descriptografa as mensagens
      const decryptedMessages = await Promise.all(
        messagesArray.map(async (msg) => {
          const decryptedText = await decryptMessage(msg.text, privateKey); // Descriptografa a mensagem com await

          if (!decryptedText) {
            console.error(
              "Decryption failed for message ID:",
              msg.id,
              "Encrypted text:",
              msg.text
            );
          }

          return { ...msg, text: decryptedText || "Error decrypting message" }; // Atualiza o campo 'text' com a mensagem descriptografada ou erro
        })
      );

      setMessages(decryptedMessages); // Define as mensagens descriptografadas no estado
    });

    return () => unsubscribe();
  }, [chatId, userId]);

  return { messages, userId, chatId };
};

export default useMessages;
