import { useState } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase"; // Ajuste o caminho conforme necessário
import { useError } from "../../errorContext/useError";
import { useUser } from "../../Users/userContext";
import JSEncrypt from "jsencrypt"; // Importa a biblioteca de criptografia

type useSendMessagesProps = {
  chatId: string;
  userId?: string; // Agora userId é opcional
};

const useSendMessage = ({ chatId, userId }: useSendMessagesProps) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { setError } = useError();
  const { userId: contextUserId } = useUser(); // userId vindo do contexto
  const finalUserId = userId || contextUserId; // Usa userId do contexto se não for passado como prop.

  // Função para buscar a chave pública do Firestore
  const fetchPublicKey = async (userId: string) => {
    try {
      console.log("Fetching public key for userId:", userId); // Loga qual usuário estamos tentando buscar
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Pega o primeiro documento
        const publicKey = userDoc.data().publicKey;
        console.log("Public key found:", publicKey); // Loga a chave pública obtida
        return publicKey;
      } else {
        console.error("Public key not found for userId:", userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching public key for userId:", userId, error);
      return null;
    }
  };

  // Função para criptografar a mensagem
  const encryptMessage = (message: string, publicKey: string) => {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const encrypted = encryptor.encrypt(message); // Retorna a mensagem criptografada

    // Log para verificar se a criptografia foi bem-sucedida
    if (!encrypted) {
      console.error("Failed to encrypt the message.");
    } else {
      console.log("Message successfully encrypted.");
    }

    return encrypted;
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim() === "" || !finalUserId) {
      console.log("Message or userId is empty, returning early.");
      return;
    }

    try {
      // Buscar a chave pública do destinatário (finalUserId)
      const recipientPublicKey = await fetchPublicKey(finalUserId);

      if (!recipientPublicKey) {
        setError("Public key not found for recipient.");
        console.error("Recipient public key is missing.");
        return;
      }

      // Criptografar a mensagem usando a chave pública do destinatário
      const encryptedMessage = encryptMessage(newMessage, recipientPublicKey);

      if (!encryptedMessage) {
        setError("Failed to encrypt message.");
        console.error("Encryption failed.");
        return;
      }

      // Adicionar a mensagem criptografada no Firestore
      await addDoc(collection(db, "messages"), {
        text: encryptedMessage, // Mensagem criptografada
        timestamp: Timestamp.now(),
        userId: finalUserId,
        chatId: chatId,
      });

      console.log("Encrypted message sent successfully."); // Log de sucesso

      setNewMessage(""); // Limpa o campo de entrada da mensagem após o envio
    } catch (error) {
      console.error("Error adding message: ", error);
      setError("Failed to send message. Please try again.");
    }
  };

  return {
    newMessage,
    setNewMessage,
    sendMessage,
  };
};

export default useSendMessage;
