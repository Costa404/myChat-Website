import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useUser } from "./userContext";

export const useImgUpload = () => {
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const { userId } = useUser();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(file);
    }
  };

  const uploadImage = async () => {
    console.log("Upload iniciado...");
    if (selectedImg) {
      console.log("Selected image:", selectedImg);
      setUploading(true);

      const storageRef = ref(storage, `profileImages/${userId}`);
      console.log("Storage reference:", storageRef);
      const uploadTask = uploadBytesResumable(storageRef, selectedImg);

      uploadTask.on(
        "state_changed",
        () => {
          console.log("Upload em progresso...");
        },
        (error) => {
          console.error("Erro no upload:", error);
          setUploading(false);
        },
        async () => {
          console.log("Upload completo!");
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("URL do upload:", url);
            setUploadUrl(url);
            setUploading(false);
            setSelectedImg(null); // Reset selected image after upload
          } catch (error) {
            console.error("Erro ao obter URL do upload:", error);
            setUploading(false);
          }
        }
      );
    } else {
      console.log("Nenhuma imagem selecionada.");
    }
  };

  return { selectedImg, handleImgChange, uploadImage, uploadUrl, uploading };
};
