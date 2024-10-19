export const calculateTimeAgo = (date: Date | null) => {
  if (!date) return "No messages yet"; // Retorna se não há mensagem

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes < 1) return "Message sent just now";
  return `Sent ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
};
