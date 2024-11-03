// import { useState } from "react";
// import { useUser } from "../../Users/userContext";
// import getOrCreateChat from "../CreateChat/getOrCreateChat";
// import { useNavigate } from "react-router-dom";

// import React from "react";

// export const useHandleFriendAdded = () => {
//   const { userId } = useUser();
//   const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
//   const [newChatId, setNewChatId] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [showNewChatButton, setShowNewChatButton] = useState<boolean>(false);

//   const HandleFriendAdded = async () => {
//     setShowNewChatButton(true);

//     if (userId && selectedFriendId) {
//       try {
//         const chatId = await getOrCreateChat(userId, selectedFriendId);
//         setNewChatId(chatId);
//         navigate(`/chat/${chatId}`); // Redireciona diretamente para o chat criado
//       } catch (error) {
//         console.error("Erro ao criar o chat:", error);
//       }
//     }
//   };

//   return {
//     HandleFriendAdded,
//     setSelectedFriendId,
//     newChatId,
//     showNewChatButton,
//   };
// };
