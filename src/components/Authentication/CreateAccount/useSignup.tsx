import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase"; // Certifique-se que db é o Firestore
import { doc, setDoc } from "firebase/firestore"; // Importa Firestore para salvar dados
import { useAuth } from "../hooksAuthentication/useAuthContext";
import { useError } from "../../errorContext/useError";
import { useState } from "react";
import { User } from "firebase/auth";

const useSignup = () => {
  const { email, password } = useAuth();
  const { setError } = useError();
  const [userInformation, setUserInformation] = useState<User | null>(null);

  const handleSignUp = async (userId: string) => {
    // Recebe o userId personalizado
    setError(null); // Limpa erros anteriores

    try {
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

// import { useAuth } from "../hooksAuthentication/useAuthContext";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../firebase";
// import { useError } from "../../errorContext/useError";
// import { useState } from "react";
// import { User } from "firebase/auth";

// const useSignup = () => {
//   const { email, password } = useAuth();
//   const { setError } = useError();

//   const [userInformation, setUserInformation] = useState<User | null>(null);
//   const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null); // Limpa erros anteriores

//     try {
//       // Cria o usuário no Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Adiciona o usuário ao Firestore com o userId fornecido

//       // Adiciona o novo usuário usando a função `addNewUser` (caso seja necessário para mais lógica)
//       // await addNewUser();

//       console.log("Usuário criado:", user);
//     } catch (error) {
//       console.error("Erro ao criar conta:", error);
//       setError("Falha ao criar conta. Tente novamente."); // Define uma mensagem de erro
//     }
//   };

//   return { handleSignUp, userInformation, setUserInformation };
// };

// export default useSignup;
