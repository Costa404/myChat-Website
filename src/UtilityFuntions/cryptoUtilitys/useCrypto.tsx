// // import { useEffect, useState } from "react";
// // import { generateKeyPair } from "./generateKeyPair";
// // import {
// //   exportKeyToBuffer,
// //   importKey,
// //   importKeyFromBuffer,
// //   importKey as importKeyFunction,
// // } from "./importKey";

// // export const useCrypto = () => {
// //   const [publicKey, setPublicKey] = useState<ArrayBuffer | null>(null);
// //   const [privateKey, setPrivateKey] = useState<ArrayBuffer | null>(null);

// //   useEffect(() => {
// //     const initializeKeys = async () => {
// //       // Gerar chaves
// //       const { generatedPublicKey, generatedPrivateKey } =
// //         await generateKeyPair();

// //       // Importar chaves para CryptoKey
// //       const importedPublicKey = await importKeyFunction(
// //         generatedPublicKey,
// //         "public"
// //       );
// //       const importedPrivateKey = await importKeyFunction(
// //         generatedPrivateKey,
// //         "private"
// //       );

// //       // Exportar chaves para ArrayBuffer
// //       const publicKeyBuffer = await exportKeyToBuffer(importedPublicKey);
// //       const privateKeyBuffer = await exportKeyToBuffer(importedPrivateKey);

// //       setPublicKey(publicKeyBuffer);
// //       setPrivateKey(privateKeyBuffer);
// //     };

// //     initializeKeys();
// //   }, []);

// //   //   =============================
// //   //   encryptMessage
// //   //   =============================

// //   const encryptMessage = async (
// //     message: string,
// //     recipientPublicKeyBuffer: ArrayBuffer
// //   ) => {
// //     if (!publicKey) throw new Error("Public key is undefined");

// //     // Importar a chave pública do buffer
// //     const recipientPublicKey = await importKeyFromBuffer(
// //       recipientPublicKeyBuffer,
// //       "public"
// //     );

// //     const encodedMessage = new TextEncoder().encode(message);
// //     const encryptedMessage = await window.crypto.subtle.encrypt(
// //       {
// //         name: "RSA-OAEP",
// //       },
// //       recipientPublicKey,
// //       encodedMessage
// //     );

// //     return encryptedMessage;
// //   };

// //   //   =============================
// //   //   decryptMessage
// //   //   =============================

// //   const decryptMessage = async (encryptedMessage: ArrayBuffer) => {
// //     if (!privateKey) throw new Error("Private key is undefined");

// //     // Importar a chave privada do buffer
// //     const privateKeyCrypto = await importKeyFromBuffer(privateKey, "private");

// //     const decryptedMessage = await window.crypto.subtle.decrypt(
// //       {
// //         name: "RSA-OAEP",
// //       },
// //       privateKeyCrypto,
// //       encryptedMessage
// //     );

// //     return new TextDecoder().decode(decryptedMessage);
// //   };

// //   return { publicKey, privateKey, encryptMessage, decryptMessage };
// // };
// import { useState, useEffect } from "react";
// import JSEncrypt from "jsencrypt";

// interface CryptoKeys {
//   publicKey: string;
//   privateKey: string;
// }

// export const useCrypto = () => {
//   const [keys, setKeys] = useState<CryptoKeys | null>(null);

//   useEffect(() => {
//     const generateKeys = () => {
//       const encryptor = new JSEncrypt();
//       encryptor.getKey(); // Generate keys

//       const publicKey = encryptor.getPublicKey();
//       const privateKey = encryptor.getPrivateKey();

//       setKeys({ publicKey, privateKey });
//     };

//     generateKeys();
//   }, []);

//   const encryptMessage = (
//     message: string,
//     recipientPublicKey: string
//   ): string => {
//     if (!keys) throw new Error("Keys are not initialized");
//     const encryptor = new JSEncrypt();
//     encryptor.setPublicKey(recipientPublicKey);
//     return encryptor.encrypt(message) || "";
//   };

//   const decryptMessage = (encryptedMessage: string): string => {
//     if (!keys) throw new Error("Keys are not initialized");
//     const decryptor = new JSEncrypt();
//     decryptor.setPrivateKey(keys.privateKey);
//     return decryptor.decrypt(encryptedMessage) || "";
//   };

//   return { publicKey: keys?.publicKey, encryptMessage, decryptMessage };
// };
