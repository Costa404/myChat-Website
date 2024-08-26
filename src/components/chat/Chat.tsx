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
      <div className={style.chatCustomization}>
        <div>
          {messages.map((message) => (
            <div className={style.messagesCustomization} key={message.id}>
              <strong
                className={style.messagesCostum}
                style={{ background: randomHexColor }} // Use a cor aleatória aqui
              >
                {message.user}:{" "}
              </strong>
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
        <button onClick={handleLogOut}>Log Out</button>

        <Link to="/">
          <button>Chat</button>
        </Link>
      </div>
    </section>
  );
};

export default Chat;
