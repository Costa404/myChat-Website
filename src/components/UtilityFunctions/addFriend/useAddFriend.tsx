// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
// import { db } from "../../../firebase";
// import { useUser } from "../../Users/userContext";
// import { createChat } from "../CreateChat/createChat";

// type addFriendType = {
//   otherUserId: string;
// };

// const useAddFriend = () => {
//   const { userId } = useUser();

//   const addFriend = async ({ otherUserId }: addFriendType) => {
//     try {
//       if (!userId) {
//         console.error(
//           "User ID is null. Please make sure the user is logged in."
//         );
//         return;
//       }

//       const friendshipRef = collection(db, "friendship");

//       // Verifica se a amizade já existe (em ambas as direções)
//       const existingFriendshipQuery = query(
//         friendshipRef,
//         where("user1Id", "==", userId),
//         where("user2Id", "==", otherUserId)
//       );

//       const reverseFriendshipQuery = query(
//         friendshipRef,
//         where("user1Id", "==", otherUserId),
//         where("user2Id", "==", userId)
//       );

//       const existingFriendshipSnapshot = await getDocs(existingFriendshipQuery);
//       const reverseFriendshipSnapshot = await getDocs(reverseFriendshipQuery);

//       // Se a amizade já existir, encerra a função
//       if (
//         !existingFriendshipSnapshot.empty ||
//         !reverseFriendshipSnapshot.empty
//       ) {
//         console.log("Amizade já existe");
//         return;
//       }

//       // Se a amizade não existe, cria a nova amizade
//       const friendshipDocRef = await addDoc(friendshipRef, {
//         user1Id: userId,
//         user2Id: otherUserId,
//         createdAt: new Date(),
//       });

//       console.log("Amizade adicionada com sucesso.");

//       // Depois de adicionar a amizade, crie o chat
//       if (friendshipDocRef) {
//         const chatId = await createChat(userId, otherUserId);
//         if (chatId) {
//           console.log("Chat criado com sucesso. Chat ID:", chatId);
//         } else {
//           console.error("Erro ao criar o chat.");
//         }
//       }
//     } catch (error) {
//       console.error("Erro ao adicionar amigo:", error);
//     }
//   };

//   return { addFriend };
// };

// export default useAddFriend;
