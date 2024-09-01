import { useEffect, useRef } from "react";
import type { Message } from "./useMessages";

interface useScrollProps {
  messages: Message[];
}

const useScroll = ({ messages }: useScrollProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  return { messagesEndRef };
};

export default useScroll;
