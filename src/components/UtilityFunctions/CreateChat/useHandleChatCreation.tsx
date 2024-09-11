import { useState } from "react";

export const useHandleChatCreation = () => {
  const [newChatId, setNewChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showNewChatButton, setShowNewChatButton] = useState<boolean>(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  return {
    newChatId,
    setNewChatId,
    loading,
    setLoading,
    showNewChatButton,
    setShowNewChatButton,
    selectedFriendId,
    setSelectedFriendId,
  };
};
