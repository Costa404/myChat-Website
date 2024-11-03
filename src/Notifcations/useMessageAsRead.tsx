// import { updateDoc } from "firebase/firestore";
// import { useUnreadMessages } from "./useUnreadMessages";

// export const useMessageAsRead = (userId: string) => {
//   const { fetchUnreadMessages } = useUnreadMessages(userId);

//   const markMessagesAsRead = async () => {
//     try {
//       const snapshot = fetchUnreadMessages();
//       const updates = snapshot.docs.map((doc) => {
//         const messageRef = doc.ref; // Referência do documento
//         return updateDoc(messageRef, { read: true });
//       });
//       await Promise.all(updates); // Aguarda todas as atualizações
//       console.log(
//         `Todas as mensagens marcadas como lidas para chatId: ${chatId}`
//       );
//     } catch (error) {
//       console.error("Erro ao marcar mensagens como lidas: ", error);
//     }
//   };
//   return { markMessagesAsRead };
// };
