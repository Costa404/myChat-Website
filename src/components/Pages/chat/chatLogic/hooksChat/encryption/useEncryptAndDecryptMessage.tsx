// import JSEncrypt from "jsencrypt";

// import { useFetchPublicKey } from "./useFetchPublicKey";
// import { useFetchPrivateKey } from "./useFetchPrivateKey";
// import { useUser } from "../../../Users/userContext";

// export const useEncryptMessage = (userId: string) => {
//   const { fetchPublicKey } = useFetchPublicKey();

//   const encryptMessage = async (message: string) => {
//     // Aguarde a resolução da função fetchPublicKey
//     const publicKey = await fetchPublicKey();

//     // Verifique se a publicKey foi recuperada corretamente
//     if (!publicKey) {
//       console.error("Public key not found.");
//       return null; // ou outra forma de indicar erro
//     }

//     // Log para verificar a chave pública utilizada e a quem pertence
//     console.log(
//       `Using public key for encryption belonging to user ID ${userId}:`,
//       publicKey
//     );

//     const encryptor = new JSEncrypt();
//     encryptor.setPublicKey(publicKey);
//     const encrypted = encryptor.encrypt(message); // Retorna a mensagem criptografada

//     // Log para verificar se a criptografia foi bem-sucedida
//     if (!encrypted) {
//       console.error("Failed to encrypt the message.");
//     } else {
//       console.log("Message successfully encrypted.");
//     }

//     return { encrypted, publicKey, message };
//   };

//   return { encryptMessage };
// };

// export const useDecryptMessage = () => {
//   const { fetchPrivateKey } = useFetchPrivateKey();
//   const { userId } = useUser();
//   const decryptMessage = async (
//     encryptedMessage: string,
//     privateKey: string
//   ): Promise<string | null> => {
//     try {
//       // Se a chave privada não for passada, busca pelo fetchPrivateKey
//       if (!privateKey) {
//         privateKey = await fetchPrivateKey();
//       }
//       if (!privateKey) {
//         throw new Error("Private key not found.");
//       }

//       // Log para verificar a chave privada utilizada e a quem pertence
//       console.log(
//         `Using private key for decryption belonging to user ID ${userId}:`,
//         privateKey
//       );
//       console.log("Decrypting message:", encryptedMessage);

//       const decryptor = new JSEncrypt();
//       decryptor.setPrivateKey(privateKey);

//       // Tenta descriptografar a mensagem
//       const decrypted = decryptor.decrypt(encryptedMessage);

//       if (!decrypted) {
//         throw new Error("Decryption failed, possibly due to incorrect key.");
//       }

//       console.log("Decrypted message:", decrypted);

//       return decrypted;
//     } catch (error) {
//       // Verifica se o erro é uma instância de Error
//       if (error instanceof Error) {
//         console.error("Decryption failed for:", encryptedMessage);
//         console.error("Error:", error.message);
//       } else {
//         console.error("Unknown error occurred during decryption.");
//       }
//       return null;
//     }
//   };

//   return { decryptMessage };
// };
