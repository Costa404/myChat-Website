import React from "react";
import useMessages from "./hooksChat/useMessages";
import useSendMessage from "./hooksChat/useSendMessage";
// import useLogOut from "../Authentication/hooksAuthentication/useLogout";
import style from "./Chat.module.css";
import ProfileImage from "../Users/ProfileImg";
import { useUser } from "../Users/userContext";
import useScroll from "./hooksChat/useScroll";

const Chat: React.FC = () => {
  const { messages } = useMessages();
  const { userId } = useUser(); // Obtemos o usuário atual do contexto de autenticação
  const { newMessage, setNewMessage, sendMessage } = useSendMessage(userId);
  const { messagesEndRef } = useScroll({ messages });

  // Define uma função para determinar se a mensagem foi enviada pelo usuário atual
  const isSentByCurrentUser = (userId: string) => userId === userId;

  // Handler de logout (comentado, pois não está em uso neste exemplo)
  // const { handleLogOut } = useLogOut();

  return (
    <section className={style.totalContent}>
      <span className={style.title}>
        <h1>myChat</h1>
      </span>
      <div className={style.chatCustomization}>
        <div className={style.messagesCustomization}>
          {messages.map((message) => (
            <div
              className={`${style.containerMessage} ${
                isSentByCurrentUser(message.userId)
                  ? style.messageSent
                  : style.messageReceived
              }`}
              key={message.id}
            >
              <ProfileImage userId={message.userId} />
              <strong className={style.messagesContent}>
                <span>{message.text}</span>
              </strong>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <form onSubmit={sendMessage} className={style.form}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
        {/* Links e botões comentados */}
        {/* <Link to="/homepage">
            <button>Homepage</button>
          </Link>
          <button onClick={handleLogOut}>Log Out</button> */}
      </div>
    </section>
  );
};

export default Chat;

// import React from "react";
// import useMessages from "./hooksChat/useMessages";
// import useSendMessage from "./hooksChat/useSendMessage";
// import useLogOut from "../Authentication/Authentication/hooksAuthentication/useLogout";
// // import useGetRandomHexColor from "./hooksChat/useGetRandomHexColor";
// import style from "./Chat.module.css";
// import { Link } from "react-router-dom";

// const Chat: React.FC = () => {
//   // Hooks personalizados
//   const { messages, userEmail } = useMessages();
//   const { newMessage, setNewMessage, sendMessage } = useSendMessage(userId);
//   const { handleLogOut } = useLogOut();
//   // const randomHexColor = useGetRandomHexColor();

//   // Renderização
//   return (
//     <section className={style.contentCustomization}>
//       <span className={style.title}>
//         <h1>myChat</h1>
//       </span>
//       <div className={style.chatCustomization}>
//         <div className={style.messagesCustomization}>
//           {messages.map((message) => (
//             <div className={style.containerMessage} key={message.id}>
//               <strong
//                 className={style.messagesCostum}
//                 // style={{ background: randomHexColor }}
//               >
//                 {message.user}{" "}
//               </strong>
//               <span> {message.text}</span>
//             </div>
//           ))}
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
//         <Link to="/">
//           <button>Homepage</button>
//         </Link>
//         <button onClick={handleLogOut}>Log Out</button>
//       </div>
//     </section>
//   );
// };

// export default Chat;
