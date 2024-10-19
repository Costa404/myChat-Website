import React from "react";
import EmojiPicker from "emoji-picker-react"; // Corrigido aqui
import style from "../Chat.module.css";
import { BsEmojiSmile } from "react-icons/bs";

interface MessageFormProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsLastSender: (value: boolean) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  setIsLastSender,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const handleEmojiSelect = (emoji: { unified: string }) => {
    const emojiString = String.fromCodePoint(parseInt(emoji.unified, 16));
    setNewMessage(newMessage + emojiString); // Correção aqui
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    sendMessage(e);
    setIsLastSender(true); // Define o último remetente após o envio da mensagem
  };

  return (
    <form onSubmit={handleFormSubmit} className={style.messageForm}>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className={style.messageInput}
      />
      <button
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className={style.emojiButton}
      >
        {showEmojiPicker ? "Hide Emojis" : <BsEmojiSmile />}
      </button>
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
      <button type="submit" className={style.sendButton}>
        Send
      </button>
    </form>
  );
};

export default MessageForm;
