import React from "react";
import useMessages from "./hooksChat/useMessages";
import useSendMessage from "./hooksChat/useSendMessage";
import useLogOut from "../Authentication/Authentication/hooksAuthentication/useLogout";
import useGetRandomHexColor from "./hooksChat/useGetRandomHexColor";
import style from "./Chat.module.css";
import { Link } from "react-router-dom";

const Chat: React.FC = () => {
  // Hooks personalizados
  const { messages, user } = useMessages();
  const { newMessage, setNewMessage, sendMessage } = useSendMessage(user);
  const { handleLogOut } = useLogOut();
  const randomHexColor = useGetRandomHexColor();

  // Renderização
  return (
    <section className={style.contentCustomization}>
      <span className={style.title}>
        <h1>myChat</h1>
      </span>
      <div className={style.chatCustomization}>
        <div className={style.messagesCustomization}>
          {messages.map((message) => (
            <div className={style.test} key={message.id}>
              <strong
                className={style.messagesCostum}
                style={{ background: randomHexColor }} // Use a cor aleatória aqui
              >
                {message.user}{" "}
              </strong>
              {message.text}
            </div>
          ))}
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
        <Link to="/">
          <button>Homepage</button>
        </Link>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </section>
  );
};

export default Chat;
