import { useDecryptMessage } from "../../chatLogic/UtilityFunctionsChat/useEncryptAndDecryptMessage";
import { useFetchPrivateKey } from "../../chatLogic/UtilityFunctionsChat/useFetchPrivateKey";

export const useReceiveMessage = (userId: string) => {
  const { decryptMessage } = useDecryptMessage(userId);
  const { fetchPrivateKey } = useFetchPrivateKey(userId);
  const receiveMessage = async (encryptedMessage: string) => {
    const privateKey = await fetchPrivateKey();

    if (!privateKey) {
      console.error("Chave privada não encontrada.");
      return;
    }

    const decryptedMessage = await decryptMessage(encryptedMessage, privateKey);

    if (!decryptedMessage) {
      console.error("Falha ao descriptografar a mensagem.");
      return;
    }

    // Aqui você pode processar a mensagem descriptografada
    console.log("Mensagem recebida:", decryptedMessage);
  };

  return { receiveMessage };
};
