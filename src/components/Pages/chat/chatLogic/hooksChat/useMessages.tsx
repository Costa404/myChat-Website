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
import { useUser } from "../../../../Users/userContext";
import { getAuth } from "firebase/auth";
import { db } from "../../../../../firebase";

export interface MessageProps {
  id: string;
  text: string;
  userId: string; // ID do usuário que enviou a mensagem
  timestamp: Timestamp; // Timestamp da mensagem
  chatId: string; // ID do chat
  from: string; // ID do usuário que enviou a mensagem
  read: boolean; // Indica se a mensagem foi lida
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

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray: MessageProps[] = [];

      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messagesArray.push({
          id: doc.id,
          ...(messageData as Omit<MessageProps, "id">),
        });
      });

      setMessages(messagesArray); // Define as mensagens recebidas no estado
    });

    return () => unsubscribe();
  }, [chatId, userId]);

  return { messages, userId, chatId };
};

export default useMessages;
