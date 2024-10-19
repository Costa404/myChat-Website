// import style from "./MainUsers.module.css";

// import { useUpdateLastMessageTimes } from "./logic/useUpdateLastMessageTimes";
// import { useHandleClickChat } from "./logic/useHandleClickChat";
// import useSearchUsers from "../CreateChat/useSearchUsers";
// import { useUser } from "../../../../Users/userContext";
// import { useUnreadMessages } from "../../../../../Notifcations/useUnreadMessages";
// import ProfileImage from "../../../../Users/UserImg/ProfileImg";

// type MainUsersProps = {
//   currentUserId: string;
// };

// const MainUsers: React.FC<MainUsersProps> = () => {
//   const { users, isLoading } = useSearchUsers();
//   const { userId } = useUser();
//   const { unreadCounts } = useUnreadMessages(userId as string);
//   const { handleClickChat } = useHandleClickChat();

//   const { lastMessageTimes, chats } = useUpdateLastMessageTimes();

//   return (
//     <section className={style.geralContentUsers}>
//       {isLoading ? (
//         <p>Loading users...</p>
//       ) : (
//         <ul className={style.displayUsers}>
//           {users.map((user) => {
//             const chat = chats.find((chat) =>
//               chat.participants.includes(user.userId)
//             );
//             const unreadCount = chat ? unreadCounts[chat.id] || 0 : 0;
//             const lastMessageTime = chat
//               ? lastMessageTimes[chat.id]
//               : "No messages yet";

//             console.log(
//               `Rendering userId: ${user.userId}, unreadCount: ${unreadCount}, lastMessageTime: ${lastMessageTime}`
//             );

//             return (
//               <div
//                 key={user.userId}
//                 className={style.contentDispalyUsers}
//                 onClick={() => handleClickChat(user.userId)}
//               >
//                 <ProfileImage userId={user.userId} />
//                 <span>
//                   <h1>{user.userId}</h1>

//                   {chat && chat.lastSenderId === userId ? (
//                     <div>{lastMessageTime || "Just now"}</div> // sender
//                   ) : unreadCount > 0 ? (
//                     <div>{`${unreadCount} New Messages`}</div> // receiver
//                   ) : (
//                     <div>{lastMessageTime || "No messages yet"}</div> // receiver, no new messages
//                   )}
//                 </span>
//               </div>
//             );
//           })}
//         </ul>
//       )}
//     </section>
//   );
// };

// export default MainUsers;
// MainUsers.tsx
import React from "react";
import style from "./MainUsers.module.css";
import UserList from "./UserList";
import useSearchUsers from "../CreateChat/useSearchUsers";
import { useUser } from "../../../../Users/userContext";
import { useUnreadMessages } from "../../../../../Notifcations/useUnreadMessages";
import { useUpdateLastMessageTimes } from "./logic/useUpdateLastMessageTimes";
import { useHandleClickChat } from "./logic/useHandleClickChat";

type MainUsersProps = {
  currentUserId: string;
};

const MainUsers: React.FC<MainUsersProps> = () => {
  const { users, isLoading } = useSearchUsers();
  const { userId } = useUser();
  const { unreadCounts } = useUnreadMessages(userId as string);
  const { chats } = useUpdateLastMessageTimes();
  const { handleClickChat } = useHandleClickChat();

  if (!userId) {
    return <p>User not found or not authenticated.</p>; //
  }

  return (
    <section className={style.geralContentUsers}>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <UserList
          users={users}
          chats={chats}
          unreadCounts={unreadCounts}
          currentUserId={userId}
          handleClickChat={handleClickChat}
        />
      )}
    </section>
  );
};

export default MainUsers;
