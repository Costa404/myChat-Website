import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../../Users/userContext";
import { createChat } from "../../CreateChat/createChat";
import { markMessagesAsRead } from "../../../../../../Notifcations/messageService";

export const useStartChat = () => {
  const { userId } = useUser();
  const navigate = useNavigate();

  const startChat = async (friendId: string) => {
    if (!userId) {
      console.error("User  ID não está disponível.");
      return;
    }

    try {
      const newChatId = await createChat(userId, friendId);

      markMessagesAsRead(newChatId, userId);
      navigate(`/chat/${newChatId}`); // Navegar para a página do chat
    } catch (error) {
      console.error("Erro ao criar o chat:", error);
    }
  };
  return { startChat };
};
