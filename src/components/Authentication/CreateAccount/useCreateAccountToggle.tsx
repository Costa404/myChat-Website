import { useState } from "react";

export const useCreateAccountToggle = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible); // Alterna o estado de visibilidade
  };
  return { isVisible, handleButtonClick };
};
