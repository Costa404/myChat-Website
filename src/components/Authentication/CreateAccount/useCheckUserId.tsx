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

  const checkUserId = async (): Promise<boolean> => {
    if (!currentUser) {
      console.error("currentUser está indefinido");
      setError("Usuário não autenticado.");
      return false;
    }
    if (!userId) {
      console.error("userId está indefinido");
      setError("ID de usuário não fornecido.");
      return false;
    }

    const userEmail = auth.currentUser.email;

    if (!userEmail) {
      console.error("E-mail do usuário está indefinido");
      setError("E-mail do usuário não encontrado.");
      return false;
    }

    try {
      const userRef = doc(db, "users", userEmail);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData && userData.userId === userId) {
          console.log("O userId já está associado a este e-mail.");
          return true;
        }
      }

      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        console.log("O userId já está associado a outro e-mail.");
        return false;
      }

      await setDoc(
        userRef,
        {
          userId: userId,
          friendId: friendId ?? null,
        },
        { merge: true }
      );

      setUserId(userId);

      navigate("/homepage");
      console.log("UserID adicionado ou atualizado com sucesso:", userId);
      return true;
    } catch (error) {
      console.error("Erro ao adicionar/atualizar o UserID:", error);
      setError("Erro ao adicionar/atualizar o UserID.");
      return false;
    }
  };

  return { checkUserId };
};
