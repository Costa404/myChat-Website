import {
  collection,
  query,
  orderBy,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../../../../firebase";

export const fetchLastMessageTimestamp = async (chatId: string) => {
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("chatId", "==", chatId),
    orderBy("timestamp", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const lastMessage = querySnapshot.docs[0];
    const timestamp = lastMessage.get("timestamp");

    console.log(
      "Timestamp encontrado:",
      timestamp ? timestamp.toDate() : "Nenhum timestamp"
    );
    return timestamp;
  }

  console.log("Nenhuma mensagem encontrada para o chatId:", chatId);
  return null;
};
