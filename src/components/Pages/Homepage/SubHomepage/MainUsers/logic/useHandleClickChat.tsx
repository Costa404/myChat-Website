import { useUser } from "../../../../../Users/userContext";
import useSearchUsers from "../../CreateChat/useSearchUsers";
import { useStartChat } from "./useStartChat";
import { useUpdateLastMessageTimes } from "./useUpdateLastMessageTimes";

export const useHandleClickChat = () => {
  const { chats, updateLastMessageTimes } = useUpdateLastMessageTimes();
  const { startChat } = useStartChat();
  const { setSelectedUserId } = useSearchUsers();
  const { userId } = useUser();

  const handleClickChat = async (friendId: string) => {
    console.log(`Starting chat with userId: ${friendId}`);

    setSelectedUserId(friendId);

    await startChat(friendId); // Envia a mensagem

    const chat = chats.find((chat) => chat.participants.includes(friendId));

    if (chat) {
      console.log(`Chat found for userId: ${friendId}, chatId: ${chat.id}`);
      if (chat.lastSenderId !== userId) {
        // receiver views the message
        updateLastMessageTimes(chat.id); // update lastMessageTime to reflect view time
      }
    } else {
      console.log(`No chat found for userId: ${friendId}`);
    }
  };

  return { handleClickChat };
};
