import { useSendEncryptedMessage } from "./useSendEncryptedMessage";

type useSendMessagesProps = {
  chatId: string;
  userId?: string;
};

const useSendMessage = ({ chatId, userId }: useSendMessagesProps) => {
  const { sendEncryptedMessage } = useSendEncryptedMessage({
    userId: userId ?? "", // Forneça uma string vazia ou um valor padrão
    chatId,
  });

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    if (!userId) {
      console.error("userId is not available. Cannot send message.");
      return;
    }
    sendEncryptedMessage(e);
  };

  return {
    handleSendMessage,
  };
};

export default useSendMessage;
