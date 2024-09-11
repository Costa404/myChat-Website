import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  Timestamp,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { useUser } from "../../Users/userContext";

export interface MessageProps {
  id: string;
  text: string;
  userId: string;
  timestamp: Timestamp;
  chatId: string;
}
type useSendMessagesProps = {
  userId: string;
  chatId: string;
};

const useMessages = ({ userId, chatId }: useSendMessagesProps) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { setUserId } = useUser();

  useEffect(() => {
    if (!userId || !chatId) {
      console.error("userId or chatId is missing");
      return;
    }
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // Recupere o userId personalizado do Firestore
    const fetchUserId = async () => {
      if (currentUser && currentUser.email) {
        const userDoc = await getDoc(doc(db, "users", currentUser.email));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserId(userData?.userId || "Unknown User");
        } else {
          console.log("User document not found for email:", currentUser.email);
          setUserId("Unknown User");
        }
      } else {
        console.log("No authenticated user found or email is null.");
      }
    };
    fetchUserId();

    // Consulta para obter mensagens filtradas pelo chatId
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp"),
      where("chatId", "==", chatId) // Filtra as mensagens pelo chatId
    );

    // Configura um ouvinte em tempo real para mensagens
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray: MessageProps[] = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messagesArray.push({
          id: doc.id,
          ...(messageData as Omit<MessageProps, "id">),
        });
      });
      setMessages(messagesArray);
    });

    // Limpa o ouvinte quando o componente é desmontado
    return () => unsubscribe();
  }, [chatId, userId, setUserId]);

  return { messages, userId, chatId };
};

export default useMessages;

// import React from "react";

// import useSendMessage from "./hooksChat/useSendMessage";
// import style from "./Chat.module.css";
// import ProfileImage from "../Users/UserImg/ProfileImg";
// import { useUser } from "../Users/userContext";
// import useScroll from "./hooksChat/useScroll";
// import Header from "../Header/Header";
// import { Link, useParams } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import useMessages from "./hooksChat/useMessages";

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

//   const { newMessage, setNewMessage, sendMessage } = useSendMessage({
//     chatId: validChatId,
//     userId: validUserId,
//   });

//   if (!chatId || !userId) {
//     // Handle cases where chatId or userId are undefined
//     console.error("chatId or userId is undefined");
//     return null;
//   }

//   return (
//     <section className={style.totalContent}>
//       <Header
//         link={
//           <Link to="/homepage">
//             <button>
//               <IoArrowBack />
//             </button>
//           </Link>
//         }
//       />
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
//         <form onSubmit={sendMessage} className={style.form}>
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
