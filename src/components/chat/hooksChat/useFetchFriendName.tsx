// import { useUser } from "../../Users/userContext";
// type useMessageAlignmentType = {
//   messageUserId: string;
// };

// export const MessageAlignment = ({
//   messageUserId,
// }: useMessageAlignmentType) => {
//   const { userId } = useUser();

//   return userId === messageUserId ? "message-sent" : "message-received";
// };

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../Users/userContext";

const useFetchFriendName = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { userId } = useUser();
  const [friendName, setFriendName] = useState<string | null>(null);

  const fetchFriendName = async (friendId: string) => {
    try {
      if (friendId !== null) {
        console.log(`friendId is set to: ${friendId}`);
        setFriendName(friendId);
      } else {
        console.log("friendId is still null, waiting for it to be set...");
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do amigo:", error);
      setFriendName("Erro ao buscar nome");
    }
  };

  useEffect(() => {
    if (chatId && userId) {
      console.log("chatId:", chatId);

      console.log("userId:", userId);

      const ids = chatId.split("-");

      const friendId = ids[0] === userId ? ids[1] : ids[0];

      console.log("friendId:", friendId);

      fetchFriendName(friendId);
    }
  }, [chatId, userId]);

  const userName = friendName
    ? friendName.charAt(0).toUpperCase() + friendName.slice(1)
    : "";

  return { userName };
};

export default useFetchFriendName;