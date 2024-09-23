// export const importKey = async (
//   keyData: ArrayBuffer,
//   keyType: "public" | "private"
// ): Promise<CryptoKey> => {
//   const algorithm = {
//     name: "RSA-OAEP",
//     hash: "SHA-256",
//   };

//   return window.crypto.subtle.importKey(
//     keyType === "public" ? "spki" : "pkcs8",
//     keyData,
//     algorithm,
//     true,
//     keyType === "public" ? ["encrypt"] : ["decrypt"]
//   );
// };

// export const exportKeyToBuffer = async (
//   key: CryptoKey
// ): Promise<ArrayBuffer> => {
//   console.log(`Exporting key to buffer:`, key);
//   const exportedKey = await window.crypto.subtle.exportKey("raw", key);
//   console.log(`Exported key buffer:`, exportedKey);
//   return exportedKey;
// };

// // ===================================================================

// // importKeyFromBuffer

// // ===================================================================
// export const importKeyFromBuffer = async (
//   keyBuffer: ArrayBuffer,
//   type: string
// ) => {
//   try {
//     let format;
//     if (type === "public") {
//       format = "spki";
//     } else if (type === "private") {
//       format = "pkcs8";
//     } else {
//       throw new Error(`Unsupported key type: ${type}`);
//     }

//     const key = await window.crypto.subtle.importKey(
//       format as "raw" | "pkcs8" | "spki", // format
//       keyBuffer, // keyData
//       {
//         name: "RSA-OAEP", // algorithm
//         hash: "SHA-256", // hash
//       },
//       true, // extractable
//       ["encrypt"] // keyUsages
//     );
//     return key;
//   } catch (error) {
//     console.error("Error importing key:", error);
//     throw error;
//   }
// };

// // Verify the key format

// const publicKey = await importKey(publicKeyBuffer);

// console.log(publicKey); // Verify the key format

// // Verify the buffer format

// const buffer = new ArrayBuffer(publicKeyBuffer.byteLength);

// console.log(buffer); // Verify the buffer format
