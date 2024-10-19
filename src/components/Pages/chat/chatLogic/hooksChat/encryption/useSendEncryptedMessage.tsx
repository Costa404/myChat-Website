// import { useState } from "react";
// import { useError } from "../../../errorContext/useError";
// import { useUser } from "../../../Users/userContext";
// import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { db } from "../../../../firebase";
// import useFetchFriendName from "./useFetchFriendName";
// import { useFetchPublicKey } from "./useFetchPublicKey";
// import { useEncryptMessage } from "./useEncryptAndDecryptMessage";

// export const useSendEncryptedMessage = ({
//   chatId,
//   userId, // Adicione o userId como parâmetro
// }: {
//   chatId: string;
//   userId: string; // Defina o tipo aqui
// }) => {
//   const [newMessage, setNewMessage] = useState<string>("");
//   const { setError } = useError();
//   const { userId: currentUserId } = useUser(); // ID do usuário autenticado
//   const { fetchPublicKey } = useFetchPublicKey(); // Use o userId aqui
//   const { userName } = useFetchFriendName(); // Pode precisar do ID do amigo em vez do nome
//   const { encryptMessage } = useEncryptMessage(userId); // Use o userId aqui

//   const sendEncryptedMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (newMessage.trim() === "" || !userName) {
//       console.log("Message or userName is empty, returning early.");
//       return;
//     }

//     try {
//       console.log("Attempting to fetch public key for userName:", userName);
//       const recipientPublicKey = await fetchPublicKey();
//       if (!recipientPublicKey) {
//         setError("Public key not found for recipient.");
//         return;
//       }

//       const encryptedMessage = await encryptMessage(newMessage); // Não passe a chave pública aqui
//       if (!encryptedMessage) {
//         setError("Failed to encrypt message.");
//         return;
//       }

//       await addDoc(collection(db, "messages"), {
//         text: encryptedMessage,
//         timestamp: Timestamp.now(),
//         userId: currentUserId,
//         chatId: chatId,
//         receiber: userName,
//       });

//       console.log("Encrypted message sent successfully.");
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending encrypted message: ", error);
//       setError("Failed to send message. Please try again.");
//     }
//   };

//   return { sendEncryptedMessage, newMessage, setNewMessage };
// };
