// import { useDecryptMessage } from "./useEncryptAndDecryptMessage";
// import { useFetchPrivateKey } from "./useFetchPrivateKey";

// export const useReceiveMessage = () => {
//   const { decryptMessage } = useDecryptMessage();
//   const { fetchPrivateKey } = useFetchPrivateKey();
//   const receiveMessage = async (encryptedMessage: string) => {
//     const privateKey = await fetchPrivateKey();

//     if (!privateKey) {
//       console.error("Chave privada não encontrada.");
//       return;
//     }

//     const decryptedMessage = await decryptMessage(encryptedMessage, privateKey);

//     if (!decryptedMessage) {
//       console.error("Falha ao descriptografar a mensagem.");
//       return;
//     }

//     // Aqui você pode processar a mensagem descriptografada
//     console.log("Mensagem recebida:", decryptedMessage);
//   };

//   return { receiveMessage };
// };
