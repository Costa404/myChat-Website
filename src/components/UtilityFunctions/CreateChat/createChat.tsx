import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const createChat = async (
  userId: string,
  friendId: string
): Promise<string> => {
  try {
    // Função para gerar um chatId consistente
    const generateChatId = (userId: string, friendId: string) => {
      console.log(
        `Generating chatId with userId: ${userId} and friendId: ${friendId}`
      );
      // Ordena os IDs para garantir consistência
      return [userId, friendId].sort().join("-");
    };

    // Verificar se userId e friendId são válidos
    if (!userId || !friendId) {
      console.error("userId ou friendId inválidos:", { userId, friendId });
      return "";
    }

    const chatId = generateChatId(userId, friendId);

    // Definir o documento do chat
    const chatDoc = doc(db, "chats", chatId);
    console.log(`Checking if chat already exists at path: chats/${chatId}`);

    // Verificar se o chat já existe
    const chatSnap = await getDoc(chatDoc);
    if (!chatSnap.exists()) {
      console.log(
        `Chat does not exist, creating new chat at path: chats/${chatId}`
      );
      // Criar um novo chat se não existir
      await setDoc(chatDoc, {
        participants: [userId, friendId],
        createdAt: new Date(),
      });
      console.log(`Chat criado: ${chatId}`);
    } else {
      console.log(`Chat já existe: ${chatId}`);
    }

    // Retornar o chatId
    return chatId;
  } catch (error) {
    console.error("Erro ao criar chat:", error);
    // Retornar uma string vazia em caso de erro
    return "";
  }
};
