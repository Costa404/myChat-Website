import React from "react";

import useSendMessage from "./hooksChat/useSendMessage";
import style from "./Chat.module.css";
import ProfileImage from "../Users/UserImg/ProfileImg";
import { useUser } from "../Users/userContext";
import useScroll from "./hooksChat/useScroll";
import styleHeader from "../Header/Header.module.css";
import { Link, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import useMessages from "./hooksChat/useMessages";
import { useGetProfileImage } from "../Users/UserImg/useGetProfileImage";

import useFetchFriendName from "./hooksChat/useFetchFriendName";

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

  const { newMessage, setNewMessage, sendMessage } = useSendMessage({
    chatId: validChatId,
    userId: validUserId,
  });

  const { userName } = useFetchFriendName();

  useGetProfileImage();

  if (!chatId || !userId) {
    // Handle cases where chatId or userId are undefined
    console.error("chatId or userId is undefined");
    return null;
  }

  return (
    <section className={style.totalContent}>
      <section className={styleHeader.header}>
        <div className={styleHeader.headerLeft}>
          {" "}
          <Link to="/homepage">
            <button>
              <IoArrowBack />
            </button>
          </Link>
          /<h1>{userName || "Nome do Amigo Padrão"}</h1>
        </div>
        <div className={styleHeader.headerChatCustom}>
          <ProfileImage userId={userId} />
        </div>
      </section>

      <div className={style.chatCustomization}>
        <div className={style.messagesCustomization}>
          {messages.map((message) => {
            const alignmentClass =
              validUserId === message.userId
                ? style.messageSent
                : style.messageReceived;

            return (
              <div
                className={`${style.containerMessage} ${alignmentClass}`}
                key={message.id}
              >
                <ProfileImage userId={message.userId} />
                <span className={style.messagesContent}>
                  <span>{message.text}</span>
                </span>
              </div>
            );
          })}
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
      </div>
    </section>
  );
};

export default Chat;
