import { useAuth } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { email, setEmail, password, setPassword, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/homepage"); // Redireciona para a homepage após login
      console.log("Logged in:", userCredential.user);
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to login. Please check your Email or password.");
    }
  };

  return { handleLogin, email, setEmail, password, setPassword, error };
};

export default useLogin;
