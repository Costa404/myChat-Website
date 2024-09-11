import {
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { useUser } from "../../Users/userContext";
import { useNavigate } from "react-router-dom";
import { useError } from "../../errorContext/useError";

export const useCheckUserId = (userId: string, friendId: string) => {
  const navigate = useNavigate();
  const { setError } = useError();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { setUserId } = useUser();

  const checkUserId = async () => {
    if (!currentUser) {
      console.error("currentUser está indefinido");
      return;
    }
    if (!userId) {
      console.error("userId está indefinido");
      return;
    }

    const userEmail = currentUser.email; // Use o e-mail do usuário

    if (!userEmail) {
      console.error("E-mail do usuário está indefinido");
      return;
    }

    try {
      // Salva o userId associado ao e-mail do usuário
      const userRef = doc(db, "users", userEmail);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData && userData.userId === userId) {
          console.log("O userId já está associado a este e-mail.");
          return;
        }
      }

      // Verifica se o userId já está associado a outro e-mail
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        console.log("O userId já está associado a outro e-mail.");
        return;
      }

      // Atualiza ou cria o documento do usuário
      await setDoc(
        userRef,
        {
          userId: userId, // Salva o userId personalizado
          friendId: friendId ?? null,
        },
        { merge: true }
      ); // Usando merge para não sobrescrever outros dados

      // Atualiza o userId no contexto
      setUserId(userId);

      navigate("/homepage");
      console.log("UserID adicionado ou atualizado com sucesso:", userId);
    } catch (error) {
      console.error("Erro ao adicionar/atualizar o UserID:", error);
      setError("Erro ao adicionar/atualizar o UserID.");
    }
  };

  return { checkUserId };
};
