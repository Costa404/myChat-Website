// chatUtils.ts ou useChatLogic.ts
export const filterUserChatIds = (chatIds: string[], currentUserId: string) => {
  return chatIds.filter((chatId) => {
    const participants = getChatParticipants(chatId); // Supondo que você tem essa função
    return participants.includes(currentUserId);
  });
};
