import { useAuth } from "../hooksAuthentication/useAuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { useError } from "../../errorContext/useError";
import useNewUser from "../../Users/useNewUser";

const useSignup = () => {
  const { email, password } = useAuth();
  const { error, setError } = useError();
  const { addNewUser } = useNewUser(); // Obtém userId e addNewUser do useNewUser
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    const form = e.target as HTMLFormElement;
    const userIdInput = form.elements.namedItem("userId") as HTMLInputElement;
    const userIdValue = userIdInput.value.trim();

    if (userIdValue === "") {
      setError("User ID is required.");
      return;
    }

    try {
      await addNewUser(userIdValue);

      // Checa se houve erro na adição do usuário
      if (error) {
        return; // Se houver erro, não continua a criação da conta
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Adiciona o novo usuário ao Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        userId: userIdValue, // Usa o userId do formulário
        email: email,
      });

      // Chama addNewUser para garantir que o usuário seja adicionado corretamente
      await addNewUser(userIdValue);

      navigate("/homepage"); // Redireciona para a homepage após o sucesso do cadastro
      console.log("User created:", userCredential.user);
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Failed to create account. Please try again."); // Define uma mensagem de erro
    }
  };

  return { handleSignUp };
};

export default useSignup;
