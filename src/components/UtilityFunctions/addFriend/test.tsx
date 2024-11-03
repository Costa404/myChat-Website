// SearchUsersButton.tsx
import React, { useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Define a interface User com todos os campos necessários
interface User {
  id: string;
  name: string;
  UserId: string;
  // Adicione outros campos conforme necessário
}

// Define a interface para os dados do documento Firestore
interface UserData {
  name: string;
  UserId: string;
  // Adicione outros campos conforme necessário
}

const SearchUsersButton: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Usa o tipo User para o estado

  const handleSearch = async () => {
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      // Mapeia os documentos para o tipo User
      const fetchedUsers: User[] = snapshot.docs.map((doc) => {
        const data = doc.data() as UserData; // Usa o tipo UserData para os dados do documento
        return {
          id: doc.id,
          name: data.name,
          UserId: data.UserId,
        };
      });
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return { handleSearch };
};

export default SearchUsersButton;
