// import React from "react";

// import style from "./Chat.module.css";
// import ProfileImage from "../Users/UserImg/ProfileImg";
// import { useUser } from "../Users/userContext";

// import styleHeader from "../Header/Header.module.css";
// import { Link, useParams } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import useMessages from "./hooksChat/useMessages";
// import { useGetProfileImage } from "../Users/UserImg/useGetProfileImage";

// import useFetchFriendName from "./hooksChat/useFetchFriendName";
// import { useSendEncryptedMessage } from "./hooksChat/useSendEncryptedMessage";
// import useScroll from "./hooksChat/useScroll";

// const Chat: React.FC = () => {
//   const { chatId } = useParams<{ chatId: string }>();
//   const { userId } = useUser();
//   const validChatId = chatId ?? "";
//   const validUserId = userId ?? "";

//   const { messages } = useMessages({
//     userId: validUserId,
//     chatId: validChatId,
//   });
//   const { messagesEndRef } = useScroll({ messages });

//   const { newMessage, setNewMessage, sendEncryptedMessage } =
//     useSendEncryptedMessage({
//       chatId: validChatId,
//       userId: validUserId,
//     });

//   const { userName } = useFetchFriendName();

//   useGetProfileImage();

//   if (!chatId || !userId) {
//     // Handle cases where chatId or userId are undefined
//     console.error("chatId or userId is undefined");
//     return null;
//   }

//   return (
//     <section className={style.totalContent}>
//       <section className={styleHeader.header}>
//         <div className={styleHeader.headerLeft}>
//           <Link to="/homepage">
//             <button>
//               <IoArrowBack />
//             </button>
//           </Link>
//           <h1>{userName || "Nome do Amigo Padrão"}</h1>
//         </div>
//         <div className={styleHeader.headerChatCustom}>
//           <ProfileImage userId={userId} />
//         </div>
//       </section>

//       <div className={style.chatCustomization}>
//         <div className={style.messagesCustomization}>
//           {messages.map((message) => {
//             const alignmentClass =
//               validUserId === message.userId
//                 ? style.messageSent
//                 : style.messageReceived;

//             return (
//               <div
//                 className={`${style.containerMessage} ${alignmentClass}`}
//                 key={message.id}
//               >
//                 <ProfileImage userId={message.userId} />
//                 <span className={style.messagesContent}>
//                   <span>{message.text}</span>
//                 </span>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef}></div>
//         </div>
//         <form onSubmit={sendEncryptedMessage} className={style.form}>
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Chat;
import React from "react";
import style from "./Chat.module.css";
import { useUser } from "../Users/userContext";
import { useParams } from "react-router-dom";

import HeaderChat from "./chatComponentes/HeaderChat";
import MessageForm from "./chatComponentes/MessageForm";
import MessageList from "./chatComponentes/MessageList";
import useMessages from "./chatLogic/hooksChat/useMessages";
import useScroll from "./chatLogic/hooksChat/useScroll";
import { useSendEncryptedMessage } from "./chatLogic/hooksChat/useSendEncryptedMessage";

const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { userId } = useUser();
  const validChatId = chatId ?? "";
  const validUserId = userId ?? "";

  const { messages } = useMessages({
    userId: validUserId,
    chatId: validChatId,
  });
  const { messagesEndRef } = useScroll({ messages });

  const { newMessage, setNewMessage, sendEncryptedMessage } =
    useSendEncryptedMessage({
      chatId: validChatId,
      userId: validUserId,
    });

  if (!chatId || !userId) {
    console.error("chatId or userId is undefined");
    return null;
  }

  return (
    <section className={style.totalContent}>
      <HeaderChat userId={validUserId} />{" "}
      {/* Usando o novo componente Header */}
      <div className={style.chatCustomization}>
        <MessageList messages={messages} currentUserId={validUserId} />{" "}
        {/* Usando o novo componente MessageList */}
        <div ref={messagesEndRef}></div>
        <MessageForm
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendEncryptedMessage={sendEncryptedMessage}
        />{" "}
        {/* Usando o novo componente MessageForm */}
      </div>
    </section>
  );
};

export default Chat;
