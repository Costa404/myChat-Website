import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    navigate("/login");
  };

  return { handleLogOut };
};

export default useLogout;
