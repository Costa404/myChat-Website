import JSEncrypt from "jsencrypt";

export const handlePrivateKey = () => {
  const encrypt = new JSEncrypt();
  const privateKey = encrypt.getPrivateKey();

  // Armazena a chave privada no dispositivo do usuário (nunca deve ser enviada para o Firestore)
  localStorage.setItem("privateKey", privateKey);

  // Retorna a chave pública para ser armazenada no Firestore
  return { privateKey };
};
