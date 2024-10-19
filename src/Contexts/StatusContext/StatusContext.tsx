// src/contexts/StatusContext.tsx
import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  isLastSender: boolean;
  setIsLastSender: (value: boolean) => void;
}

const StatusContext = createContext<UserContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLastSender, setIsLastSender] = useState<boolean>(false);
  return (
    <StatusContext.Provider value={{ isLastSender, setIsLastSender }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatusContext = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatusContext must be used within a StatusProvider");
  }
  return context;
};
