import React from "react";
import style from "./../Chat.module.css";
import ProfileImage from "../../../Users/UserImg/ProfileImg";

interface Message {
  id: string;
  userId: string;
  text: string;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => {
  return (
    <div className={style.messagesCustomization}>
      {messages.map((message) => {
        const alignmentClass =
          currentUserId === message.userId
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
    </div>
  );
};

export default MessageList;
