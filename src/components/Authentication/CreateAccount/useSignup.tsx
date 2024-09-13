import { useAuth } from "../hooksAuthentication/useAuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useError } from "../../errorContext/useError";
import { useState } from "react";
import { User } from "firebase/auth";

const useSignup = () => {
  const { email, password } = useAuth();
  const { setError } = useError();

  const [userInformation, setUserInformation] = useState<User | null>(null);
  const handleSignUp = async () => {
    setError(null); // Limpa erros anteriores

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Adiciona o usuário ao Firestore com o userId fornecido

      // Adiciona o novo usuário usando a função `addNewUser` (caso seja necessário para mais lógica)
      // await addNewUser();

      console.log("Usuário criado:", user);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setError("Falha ao criar conta. Tente novamente."); // Define uma mensagem de erro
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
