import React from "react";
import { useStatusContext } from "../../../../../../Contexts/StatusContext/StatusContext";
import { calculateTimeAgo } from "../logic/calculateTimeAgo";
import { useUser } from "../../../../../Users/userContext";
import useLastMessage from "./useLastMessage";

type UserStatusProps = {
  unreadCount: number;
};

const UserStatus: React.FC<UserStatusProps> = ({ unreadCount }) => {
  const { userId } = useUser();
  const { isLastSender } = useStatusContext();
  const { lastMessage, loading } = useLastMessage(userId as string);

  if (loading) return <div>Loading...</div>;

  const timeAgo = calculateTimeAgo(lastMessage);

  return (
    <div>
      {isLastSender ? (
        <div>{timeAgo || "Just now"}</div>
      ) : unreadCount > 0 ? (
        <div>{`${unreadCount} New Messages`}</div>
      ) : (
        <div>{timeAgo || "No messages yet"}</div>
      )}
    </div>
  );
};

export default UserStatus;
