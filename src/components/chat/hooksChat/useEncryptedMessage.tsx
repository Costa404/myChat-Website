// import { useCrypto } from "../../../UtilityFuntions/cryptoUtilitys/useCrypto";
// import { importKeyFromBuffer } from "../../../UtilityFuntions/cryptoUtilitys/importKey";

// const useEncryptedMessage = () => {
//   const { encryptMessage } = useCrypto();

//   // Função para exportar a chave pública para ArrayBuffer
//   const exportPublicKeyToArrayBuffer = async (publicKey: CryptoKey) => {
//     try {
//       console.log("Exportando chave pública para ArrayBuffer...");
//       const exportedKey = await window.crypto.subtle.exportKey(
//         "spki",
//         publicKey
//       );
//       console.log("Chave pública exportada com sucesso:", exportedKey);
//       return exportedKey;
//     } catch (error) {
//       console.error("Erro ao exportar chave pública:", error);
//       throw error;
//     }
//   };

//   const createMessage = async (
//     message: string,
//     recipientPublicKeyBuffer: ArrayBuffer
//   ) => {
//     try {
//       console.log("Importando chave pública do buffer...");
//       const publicKey = await importKeyFromBuffer(
//         recipientPublicKeyBuffer,
//         "public"
//       );
//       console.log("Chave pública importada com sucesso:", publicKey);

//       console.log("Exportando chave pública para ArrayBuffer...");
//       const publicKeyArrayBuffer = await exportPublicKeyToArrayBuffer(
//         publicKey
//       );
//       console.log("ArrayBuffer da chave pública:", publicKeyArrayBuffer);

//       console.log("Criptografando mensagem...");
//       const encryptedMessage = await encryptMessage(
//         message,
//         publicKeyArrayBuffer
//       );
//       console.log("Mensagem criptografada com sucesso:", encryptedMessage);

//       return encryptedMessage;
//     } catch (error) {
//       console.error("Erro ao criar mensagem:", error);
//       throw error;
//     }
//   };

//   return { createMessage };
// };

// export default useEncryptedMessage;
