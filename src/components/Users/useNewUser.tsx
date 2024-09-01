import { useError } from "../errorContext/useError";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { useUser } from "./userContext";

const useNewUser = () => {
  const { userId, setUserId } = useUser();
  const { setError } = useError();

  // No useNewUser:
  const addNewUser = async (userId: string) => {
    if (userId.trim() === "") {
      setError("User ID is required.");
      return;
    }

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Salva o userId personalizado no Firestore usando o UID do usuário como chave
        await setDoc(doc(db, "users", currentUser.uid), {
          userId: userId, // Salva o userId personalizado
        });

        setUserId(userId); // Define o userId no contexto do usuário
        setError(null);
      }
    } catch (error) {
      console.error("Error adding user: ", error);
      setError("Failed to add user. Please try again.");
    }
  };

  return { userId, setUserId, addNewUser };
};

export default useNewUser;
