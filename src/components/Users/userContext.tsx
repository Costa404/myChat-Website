// ErrorContext.tsx
import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  userId: string | null; // Permite string ou null
  setUserId: (user: string | null) => void; // Aceita string ou null
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("userContext must be used within an ErrorProvider");
  }
  return context;
};
