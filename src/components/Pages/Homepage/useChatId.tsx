import { useState } from "react";

export const useChatId = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  return { chatId, setChatId };
};
