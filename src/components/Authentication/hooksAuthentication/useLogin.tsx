import { useAuth } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useError } from "../../errorContext/useError";
import { useGetProfileImage } from "../../Users/UserImg/useGetProfileImage";
import { getDoc, doc } from "firebase/firestore";
import { useUser } from "../../Users/userContext";
import { db } from "../../../firebase";

// import { handlePrivateKey } from "../../chat/hooksChat/EncryptFiles/generateKeyPair";

const useLogin = () => {
  const { email, setEmail, password, setPassword } = useAuth();
  const navigate = useNavigate();
  const { setError } = useError();
  const { setUserId } = useUser();

  const { getProfileImage } = useGetProfileImage();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.email) {
        throw new Error("User email is not available.");
      }

      const profileImageUrl = await getProfileImage();
      if (profileImageUrl) {
        console.log("Profile image URL:", profileImageUrl);
      }

      const userDoc = await getDoc(doc(db, "users", user.email));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User document data:", userData);

        const customUserID = userData?.userId || null;
        if (customUserID) {
          console.log("Setting userId in context:", customUserID);
          setUserId(customUserID);

          console.log("UserID has been set in context:", customUserID);
          navigate("/homepage");
        } else {
          console.error("Custom UserID not found in user document data.");
        }
      } else {
        console.error("User document not found in Firestore.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to login. Please check your Email or password.");
    }
  };

  return { handleLogin, email, setEmail, password, setPassword };
};

export default useLogin;
