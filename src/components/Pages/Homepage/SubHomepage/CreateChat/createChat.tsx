import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";

export const createChat = async (
  userId: string,
  friendId: string
): Promise<string> => {
  try {
    // Função para gerar um chatId consistente
    const generateChatId = (userId: string, friendId: string) => {
      // console.log(
      //   `Generating chatId with userId: ${userId} and friendId: ${friendId}`
      // );
      // Ordena os IDs para garantir consistência
      return [userId, friendId].sort().join("-");
    };

    if (!userId || !friendId) {
      console.error("userId ou friendId inválidos:", { userId, friendId });
      return "";
    }

    const chatId = generateChatId(userId, friendId);

    // Verificar se o chat já existe
    const chatDoc = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatDoc);

    if (!chatSnap.exists()) {
      console.log(`Chat não existe, criando novo chat: chats/${chatId}`);
      // Criar novo chat se não existir
      await setDoc(chatDoc, {
        participants: [userId, friendId],
        createdAt: new Date(),
      });
      console.log(`Chat criado: ${chatId}`);
    } else {
      console.log(`Chat já existe: ${chatId}`);
    }

    return chatId;
  } catch (error) {
    console.error("Erro ao criar chat:", error);
    return "";
  }
};
