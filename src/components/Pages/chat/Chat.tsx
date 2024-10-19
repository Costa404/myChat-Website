import React, { useEffect } from "react";
import style from "./Chat.module.css";

import { useParams } from "react-router-dom";

import HeaderChat from "./chatComponentes/HeaderChat";
import MessageForm from "./chatComponentes/MessageForm";
import MessageList from "./chatComponentes/MessageList";
import useMessages from "./chatLogic/hooksChat/useMessages";
import useScroll from "./chatLogic/hooksChat/useScroll";
import useSendMessage from "./chatLogic/hooksChat/useSendMessage";
import { useUser } from "../../Users/userContext";
import { markMessagesAsRead } from "../../../Notifcations/messageService";
import { useStatusContext } from "../../../Contexts/StatusContext/StatusContext";

const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { userId } = useUser();
  const validChatId = chatId ?? "";
  const validUserId = userId ?? "";
  const { setIsLastSender } = useStatusContext();

  const { messages } = useMessages({
    userId: validUserId,
    chatId: validChatId,
  });
  const { messagesEndRef } = useScroll({ messages });

  const { newMessage, setNewMessage, sendMessage } = useSendMessage({
    chatId: validChatId,
    userId: validUserId,
  });

  useEffect(() => {
    if (validChatId && validUserId) {
      markMessagesAsRead(validChatId, validUserId);
    }
  }, [validChatId, validUserId, messages]); // Executa quando chatId ou userId mudarem

  if (!chatId || !userId) {
    console.error("chatId or userId is undefined");
    return null;
  }

  if (typeof setIsLastSender !== "function") {
    throw new Error("setIsLastSender is undefined or not a function");
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
          setIsLastSender={setIsLastSender}
          sendMessage={sendMessage} // Atualizado para sendMessage
        />{" "}
      </div>
    </section>
  );
};

export default Chat;
