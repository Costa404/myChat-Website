// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../../firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { useAuth } from "../hooksAuthentication/useAuthContext";
// import { useError } from "../../errorContext/useError";
// import { useState } from "react";
// import { User } from "firebase/auth";
// import { useCrypto } from "../../../UtilityFuntions/cryptoUtilitys/useCrypto";

// const useSignup = () => {
//   const { email, password } = useAuth();
//   const { setError } = useError();
//   const [userInformation, setUserInformation] = useState<User | null>(null);
//   const { publicKey } = useCrypto(); // Aqui publicKey deve ser acessível

//   const handleSignUp = async (userId: string) => {
//     setError(null);

//     try {
//       if (!publicKey) throw new Error("Public key is not available");

//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", userId), {
//         // Usar userId em vez de email
//         userId: userId,
//         email: user.email,
//         createdAt: new Date(),
//         publicKey, // Adiciona a chave pública
//       });

//       console.log(
//         "User created and added to Firestore with custom userId:",
//         userId
//       );
//       return true;
//     } catch (error) {
//       console.error("Error creating account:", error);
//       setError("Failed to create account. Please try again.");
//       return false;
//     }
//   };

//   return { handleSignUp, userInformation, setUserInformation };
// };

// export default useSignup;

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase"; // Certifique-se que db é o Firestore
import { doc, setDoc } from "firebase/firestore"; // Importa Firestore para salvar dados
import { useAuth } from "../hooksAuthentication/useAuthContext";
import { useError } from "../../errorContext/useError";
import { useState } from "react";
import { User } from "firebase/auth";
import { useCrypto } from "../../../UtilityFuntions/cryptoUtilitys/useCrypto";

const useSignup = () => {
  const { email, password } = useAuth();
  const { setError } = useError();
  const [userInformation, setUserInformation] = useState<User | null>(null);
  const { publicKey } = useCrypto();

  const handleSignUp = async (userId: string) => {
    // Recebe o userId personalizado
    setError(null); // Limpa erros anteriores

    try {
      if (!publicKey) throw new Error("Public key is not available");

      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Adiciona o usuário à coleção 'users' no Firestore com o userId personalizado
      await setDoc(doc(db, "users", email), {
        // Salva com o userId
        userId: userId, // Usa o userId personalizado
        email: user.email,
        createdAt: new Date(),
        publicKey,
      });

      console.log(
        "User created and added to Firestore with custom userId:",
        userId
      );
      return true;
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Failed to create account. Please try again."); // Define uma mensagem de erro
      return false;
    }
  };

  return { handleSignUp, userInformation, setUserInformation };
};

export default useSignup;
