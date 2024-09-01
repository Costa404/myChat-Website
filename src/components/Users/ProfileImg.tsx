import React, { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { useImgUpload } from "./useImgUpload";
import styleCreateAccount from "../Authentication/CreateAccount/CreateAccount.module.css";

interface ProfileImageProps {
  userId: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userId }) => {
  const { uploadUrl } = useImgUpload();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imageRef = ref(storage, `profileImages/${userId}`);
        console.log(`Fetching URL for: profileImages/${userId}`);
        const url = await getDownloadURL(imageRef);
        setProfileImageUrl(url);
      } catch (error) {
        console.error("Failed to fetch image URL:", error);
        setProfileImageUrl(null);
      }
    };

    fetchImageUrl();
  }, [userId]);

  useEffect(() => {
    if (uploadUrl) {
      setProfileImageUrl(uploadUrl); // Atualiza a URL do perfil quando o upload é concluído
    }
  }, [uploadUrl]);

  return (
    <div className={styleCreateAccount.messageContainer}>
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="User Profile"
          className="profile-image"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileImage;
