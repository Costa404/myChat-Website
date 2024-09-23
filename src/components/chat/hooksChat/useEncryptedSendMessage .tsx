// import { useState } from "react";
// import useSendMessage from "./useSendMessage"; // Hook para envio de mensagens
// import useEncryptedMessage from "./useEncryptedMessage";

// type UseEncryptedSendMessageProps = {
//   chatId: string;
//   userId: string;
//   recipientPublicKeyBuffer: ArrayBuffer; // A chave pública do destinatário
// };

// const useEncryptedSendMessage = ({
//   chatId,
//   userId,
//   recipientPublicKeyBuffer,
// }: UseEncryptedSendMessageProps) => {
//   const { createMessage } = useEncryptedMessage();
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [encryptedMessage, setEncryptedMessage] = useState<ArrayBuffer | null>(
//     null
//   );

//   const { sendMessage } = useSendMessage();

//   const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Previne o envio padrão do formulário

//     if (newMessage.trim() === "") {
//       console.log("Message is empty, returning early.");
//       return;
//     }

//     try {
//       // Criptografa a mensagem usando a chave pública do destinatário
//       const encrypted = await createMessage(
//         newMessage, // Mensagem do input
//         recipientPublicKeyBuffer // Chave pública do destinatário
//       );

//       setEncryptedMessage(encrypted); // Atualiza o estado encryptedMessage
//       if (encryptedMessage)
//         // Envia a mensagem criptografada
//         await sendMessage({
//           // Aqui enviamos o chatId, userId, e a mensagem criptografada
//           chatId, // Passando chatId como string
//           userId, // Passando userId como string
//           encryptedMessage: encryptedMessage, // Utiliza o valor do estado encryptedMessage
//         });

//       // Limpa o campo de texto após o envio
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error encrypting or sending the message:", error);
//     }
//   };

//   return {
//     newMessage,
//     setNewMessage,
//     handleSendMessage,
//   };
// };

// export default useEncryptedSendMessage;
