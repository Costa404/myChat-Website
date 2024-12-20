import React from "react";
import UserItem from "./UserItem";

interface Chat {
  id: string;
  participants: string[];
  lastSenderId: string;
  lastMessageTime?: string; // ? Opcional
}

type UserListProps = {
  users: Array<{ userId: string }>;
  chats: Chat[];
  unreadCounts: { [key: string]: number };
  currentUserId: string;
  handleClickChat: (userId: string) => void;
};

const UserList: React.FC<UserListProps> = ({
  users,
  chats,
  unreadCounts,
  currentUserId,
  handleClickChat,
}) => {
  return (
    <ul className="displayUsers">
      {users.map((user) => {
        const chat = chats.find((chat) =>
          chat.participants.includes(user.userId)
        );

        const unreadCount = chat ? unreadCounts[chat.id] || 0 : 0;
        const lastMessageTime =
          chat && chat.lastMessageTime
            ? chat.lastMessageTime
            : "No messages yet";

        console.log(
          `User ID: ${user.userId}, Chat: ${chat}, Last Message Time: ${lastMessageTime}`
        );

        if (!lastMessageTime) {
          throw new Error(
            "Error: lastMessageTime is undefined or user not authenticated."
          );
        }

        const isLastSender = !!(chat && chat.lastSenderId === currentUserId);

        return (
          <UserItem
            key={user.userId}
            userId={user.userId}
            lastMessageTime={lastMessageTime}
            unreadCount={unreadCount}
            isLastSender={isLastSender}
            onClick={() => handleClickChat(user.userId)}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
