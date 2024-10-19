// UserItem.tsx
import React from "react";
import styleMainUsers from "./MainUsers.module.css";
import UserStatus from "./UserStatus/UserStatus";
import ProfileImage from "../../../../Users/UserImg/ProfileImg";

type UserItemProps = {
  userId: string;
  lastMessageTime: string;
  unreadCount: number;
  isLastSender: boolean;
  onClick: () => void;
};

const UserItem: React.FC<UserItemProps> = ({
  userId,
  // lastMessageTime,
  unreadCount,
  // isLastSender,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={styleMainUsers.contentDispalyUsers}>
      <ProfileImage userId={userId} />
      <span>
        <h1>{userId}</h1>

        <UserStatus
          // lastMessageTime={lastMessageTime}
          unreadCount={unreadCount}

          // isLastSender={isLastSender}
        />
      </span>
    </div>
  );
};

export default UserItem;
