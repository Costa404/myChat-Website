import React from "react";
import style from "./../Chat.module.css";

interface MessageFormProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendEncryptedMessage: (event: React.FormEvent<HTMLFormElement>) => void; // Alterado para React.FormEvent<HTMLFormElement>
}

const MessageForm: React.FC<MessageFormProps> = ({
  newMessage,
  setNewMessage,
  sendEncryptedMessage,
}) => {
  return (
    <form onSubmit={sendEncryptedMessage} className={style.form}>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
