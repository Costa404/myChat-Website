import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

type Message = {
  time: Timestamp;
};

export const useMessageSender = (lastMessage: Message | null) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (!lastMessage) return;

    const formatTimeAgo = (timestamp: Timestamp) => {
      const now = new Date();
      const seconds = Math.floor(
        (now.getTime() - timestamp.toDate().getTime()) / 1000
      );
      const interval = Math.floor(seconds / 60);
      if (interval < 1) return "Just now";
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;
    };

    setTimeAgo(formatTimeAgo(lastMessage.time));

    const intervalId = setInterval(() => {
      setTimeAgo(formatTimeAgo(lastMessage.time));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [lastMessage]);

  return { timeAgo, lastMessage };
};
