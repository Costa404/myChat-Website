import React, { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase";

import styleCreateAccount from "../../Authentication/CreateAccount/CreateAccount.module.css";
import { useImgUpload } from "./useImgUpload";

type ProfileImageProps = {
  userId: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ userId }) => {
  const { uploadUrl } = useImgUpload();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!userId) {
        console.warn("User ID is not available yet.");
        setLoading(false);
        return;
      }

      // const storedUrl = localStorage.getItem(`profileImage_${userId}`);
      // if (storedUrl) {
      //   setProfileImageUrl(storedUrl);
      //   setLoading(false);
      //   return;
      // }

      const imageRef = ref(storage, `profileImages/${userId}`);
      try {
        const url = await getDownloadURL(imageRef);
        localStorage.setItem(`profileImage_${userId}`, url);
        setProfileImageUrl(url);
      } catch (error) {
        console.error("Failed to fetch image URL:", error);
        setProfileImageUrl(null); // Ou um fallback para uma imagem padrão
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrl();
  }, [userId, uploadUrl]);

  if (loading) {
    return <img src="/path/to/placeholder-image.jpg" alt="Loading..." />;
  }

  return (
    <div className={styleCreateAccount.messageContainer}>
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          className="profile-image"
          alt="User Profile"
        />
      ) : (
        <img src="/path/to/placeholder-image.jpg" alt="No Profile" />
      )}
    </div>
  );
};

export default ProfileImage;
