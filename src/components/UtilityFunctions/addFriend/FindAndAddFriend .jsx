// import React from "react";
// import useSearchUsers from "./useSearchUsers";
// import { useAddFriend } from "./useAddFriend";

// const AddFriendComponent = () => {
//   const currentUserId = "currentUserId"; // Seu ID de usuário atual
//   const {
//     users,
//     searchQuery,
//     setSearchQuery,
//     handleSearch,
//     isLoading,
//     selectedUserId,
//     setSelectedUserId,
//   } = useSearchUsers(currentUserId);
//   const { addFriend } = useAddFriend();

//   const handleAddFriendClick = async () => {
//     if (selectedUserId) {
//       try {
//         await addFriend({ otherUserId: selectedUserId });
//         alert("Amigo adicionado com sucesso!");
//       } catch (error) {
//         console.error("Erro ao adicionar amigo:", error);
//       }
//     }
//   };

//   return;
// };

// export default AddFriendComponent;
