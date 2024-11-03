// import React from "react";
// import EmojiPicker from "emoji-picker-react"; // Corrigido aqui
// import style from "./MessageForm.module.css";

// interface MessageFormProps {
//   newMessage: string;
//   setNewMessage: (message: string) => void;
//   sendEncryptedMessage: (e: React.FormEvent<HTMLFormElement>) => void;
// }

// const MessageForm: React.FC<MessageFormProps> = ({
//   newMessage,
//   setNewMessage,
//   sendEncryptedMessage,
// }) => {
//   const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

//   const handleEmojiSelect = (emoji: { unified: string }) => {
//     const emojiString = String.fromCodePoint(parseInt(emoji.unified, 16));
//     setNewMessage(newMessage + emojiString); // Correção aqui
//   };

//   return (
//     <form onSubmit={sendEncryptedMessage} className={style.messageForm}>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="Type a message..."
//         className={style.messageInput}
//       />
//       <button
//         type="button"
//         onClick={() => setShowEmojiPicker((prev) => !prev)}
//         className={style.emojiButton}
//       >
//         {showEmojiPicker ? "Hide Emojis" : "Show Emojis"}
//       </button>
//       {showEmojiPicker && (
//         <EmojiPicker onEmojiClick={handleEmojiSelect} />
//       )}
//       <button type="submit" className={style.sendButton}>
//         Send
//       </button>
//     </form>
//   );
// };

// export default MessageForm;
