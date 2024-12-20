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

    await startChat(friendId);

    const chat = chats.find((chat) => chat.participants.includes(friendId));

    if (chat) {
      console.log(`Chat found for userId: ${friendId}, chatId: ${chat.id}`);
      if (chat.lastSenderId !== userId) {
        updateLastMessageTimes(chat.id);
      }
    } else {
      console.log(`No chat found for userId: ${friendId}`);
    }
  };

  return { handleClickChat };
};
