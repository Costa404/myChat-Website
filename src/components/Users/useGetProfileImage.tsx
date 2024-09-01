import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { useUser } from "./userContext";

export const useGetProfileImage = () => {
  const { userId } = useUser();
  const getProfileImage = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return null;
    }

    const storageRef = ref(storage, `profileImages/${userId}`);
    console.log("Storage reference:", storageRef.fullPath); // Verifique o caminho

    try {
      const url = await getDownloadURL(storageRef);
      console.log("Profile image URL:", url);
      return url;
    } catch (error) {
      console.error("Erro ao obter URL da imagem de perfil:", error);
      return null;
    }
  };

  return {
    getProfileImage,
  };
};
