import { useState } from "react";

export const useImgUpload = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
    }
  };

  return { selectedImg, handleImgChange };
};
