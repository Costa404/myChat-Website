import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

// Definindo o tipo da mensagem recebida
type Message = {
  time: Timestamp;
};

// Hook personalizado para calcular o tempo da última mensagem
export const useMessageSender = (lastMessage: Message | null) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (!lastMessage) return;

    const formatTimeAgo = (timestamp: Timestamp) => {
      const now = new Date();
      const seconds = Math.floor(
        (now.getTime() - timestamp.toDate().getTime()) / 1000
      );
      const interval = Math.floor(seconds / 60); // em minutos
      if (interval < 1) return "Just now";
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;
    };

    setTimeAgo(formatTimeAgo(lastMessage.time));

    // Atualiza o tempo a cada minuto para manter o "time ago" atualizado
    const intervalId = setInterval(() => {
      setTimeAgo(formatTimeAgo(lastMessage.time));
    }, 60000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [lastMessage]);

  return { timeAgo, lastMessage };
};
