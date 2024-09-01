import { useAuth } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useError } from "../../errorContext/useError";

import { useGetProfileImage } from "../../Users/useGetProfileImage";

const useLogin = () => {
  const { email, setEmail, password, setPassword } = useAuth();
  const navigate = useNavigate();
  const { setError } = useError();

  const { getProfileImage } = useGetProfileImage();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userId = userCredential.user.uid;
      const profileImageUrl = await getProfileImage(userId);

      if (profileImageUrl) {
        console.log("URL da imagem de perfil:", profileImageUrl);
        // Você pode salvar a URL em um estado global, contexto, ou localmente se necessário
      }

      navigate("/homepage"); // Redireciona para a homepage após login
      console.log("Logged in:", userCredential.user);
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to login. Please check your Email or password.");
    }
  };

  return { handleLogin, email, setEmail, password, setPassword };
};

export default useLogin;
