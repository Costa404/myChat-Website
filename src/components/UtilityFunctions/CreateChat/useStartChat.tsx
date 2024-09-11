import { useHandleChatCreation } from "./useHandleChatCreation";
import { createChat } from "./createChat";

const useStartChat = () => {
  const { setNewChatId } = useHandleChatCreation();

  const startChat = async (
    userId: string,
    friendId: string
  ): Promise<string | null> => {
    if (userId && friendId) {
      const chatId = await createChat(userId, friendId);
      if (chatId) {
        setNewChatId(chatId);
        return chatId; // Retorne o chatId gerado
      }
    }
    return null; // Retorne null se não houver chatId
  };

  return { startChat };
};

export default useStartChat;
