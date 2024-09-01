import { useUser } from "../../Users/userContext";
type useMessageAlignmentType = {
  messageUserId: string;
};

export const useMessageAlignment = ({
  messageUserId,
}: useMessageAlignmentType) => {
  const { userId } = useUser(); // Supondo que você tenha um hook ou contexto que fornece o usuário atual

  return userId === messageUserId ? "message-sent" : "message-received";
};
