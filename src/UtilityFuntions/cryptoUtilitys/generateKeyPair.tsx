// // generateKeyPair.ts
// export const generateKeyPair = async () => {
//   const keyPair = await window.crypto.subtle.generateKey(
//     {
//       name: "RSA-OAEP",
//       modulusLength: 2048,
//       publicExponent: new Uint8Array([1, 0, 1]),
//       hash: "SHA-256",
//     },
//     true,
//     ["encrypt", "decrypt"]
//   );

//   const generatedPublicKey = await window.crypto.subtle.exportKey(
//     "spki",
//     keyPair.publicKey
//   );
//   const generatedPrivateKey = await window.crypto.subtle.exportKey(
//     "pkcs8",
//     keyPair.privateKey
//   );

//   return { generatedPublicKey, generatedPrivateKey }; // Retorno ajustado com os nomes
// };
