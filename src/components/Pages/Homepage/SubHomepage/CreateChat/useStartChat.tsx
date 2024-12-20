// import { createChat } from "./createChat";
// import { useState } from "react";
// import { useUser } from "../../Users/userContext";
// import { useHandleChatCreation } from "./useHandleChatCreation";

// export const useStartChat = () => {
//   const { setNewChatId } = useHandleChatCreation();
//   const [chatId, setChatId] = useState<string | null>(null);

//   const handleChatCreation = async (
//     userId: string,
//     friendId: string
//   ): Promise<string | null> => {
//     if (userId && friendId) {
//       const newChatId = await createChat(userId, friendId);
//       if (newChatId) {
//         setNewChatId(newChatId);
//         setChatId(newChatId); // Atualize o estado com o chatId gerado
//         return newChatId;
//       }
//     }
//     return null;
//   };

//   return { startChat: handleChatCreation, chatId };
// };

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
        return chatId;
      }
    }
    return null;
  };

  return { startChat };
};

export default useStartChat;
