// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../firebase";

// export const createChat = async (userId1: string, userId2: string) => {
//   try {
//     const chatRef = await addDoc(collection(db, "chats"), {
//       participants: [userId1, userId2],
//       createdAt: new Date(),
//     });

//     console.log("Chat criado com sucesso! Chat ID:", chatRef.id);
//     return chatRef.id;
//   } catch (error) {
//     console.error("Erro ao criar o chat:", error);
//     throw error;
//   }

//   return;
// };
