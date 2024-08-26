import { useAuth } from "../useAuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../firebase";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const { email, password, setError } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/homepage"); // Redireciona para a homepage após o sucesso do cadastro
      console.log("User created:", userCredential.user);
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Failed to create account. Please try again.");
    }
  };

  return { handleSignUp };
};

export default useSignup;
