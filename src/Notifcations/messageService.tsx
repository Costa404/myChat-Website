import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetchUnreadMessages = async (chatId: string, userId: string) => {
  try {
    console.log(
      "Fetching unread messages for chatId:",
      chatId,
      "and userId:",
      userId
    );
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("chatId", "==", chatId),
      where("userId", "!=", userId),
      where("read", "==", false)
    );
    return await getDocs(q);
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    throw error;
  }
};

export const markMessagesAsRead = async (chatId: string, userId: string) => {
  try {
    const snapshot = await fetchUnreadMessages(chatId, userId);
    const updates = snapshot.docs.map((doc) => {
      const messageRef = doc.ref; // Referência do documento
      console.log("Document Reference:", messageRef); // V
      return updateDoc(messageRef, { read: true });
    });
    await Promise.all(updates); // Aguarda todas as atualizações
    console.log(
      `Todas as mensagens marcadas como lidas para chatId: ${chatId}`
    );
  } catch (error) {
    console.error("Erro ao marcar mensagens como lidas: ", error);
  }
};
