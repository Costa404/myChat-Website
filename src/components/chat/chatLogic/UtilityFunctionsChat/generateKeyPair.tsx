// import JSEncrypt from "jsencrypt";

// export const handlePrivateKey = (userId: string) => {
//   const storedPrivateKey = localStorage.getItem(`privateKey_${userId}`);

//   // Se a chave privada já existe no localStorage, reutilize-a
//   if (storedPrivateKey) {
//     console.log("Private key already exists for this user.");
//     return { privateKey: storedPrivateKey };
//   }

//   // Caso contrário, gere uma nova chave
//   const encrypt = new JSEncrypt(); // Especifica o tamanho da chave, se necessário
//   const newPrivateKey = encrypt.getPrivateKey();

//   // Armazena a nova chave privada no localStorage, associada ao userId
//   localStorage.setItem(`privateKey_${userId}`, newPrivateKey);

//   console.log("New private key generated and stored.");
//   return { privateKey: newPrivateKey };
// };

// export const handlePublicKey = (userId?: string) => {
//   const storedPublicKey = localStorage.getItem(`publicKey_${userId}`);

//   // Se a chave pública já existe no localStorage, reutilize-a
//   if (storedPublicKey) {
//     console.log("Public key already exists for this user.");
//     return { publicKey: storedPublicKey };
//   }

//   // Caso contrário, gere uma nova chave
//   const encrypt = new JSEncrypt();
//   const newPublicKey = encrypt.getPublicKey();

//   // Armazena a nova chave pública no localStorage, associada ao userId
//   localStorage.setItem(`publicKey_${userId}`, newPublicKey);

//   console.log("New public key generated and stored.");
//   return { publicKey: newPublicKey };
// };
import JSEncrypt from "jsencrypt";

// Função para gerar a chave privada e pública
export const generateKeyPair = () => {
  const encrypt = new JSEncrypt(); // Tamanho da chave pode ser alterado se necessário

  // Gera as chaves
  const privateKey = encrypt.getPrivateKey();
  const publicKey = encrypt.getPublicKey();

  console.log("Generated Private Key:", privateKey);
  console.log("Generated Public Key:", publicKey);

  // Retorna as chaves
  return { privateKey, publicKey };
};
