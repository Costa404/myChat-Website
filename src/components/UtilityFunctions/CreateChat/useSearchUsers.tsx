import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importar o Firebase Authentication
import { db } from "../../../firebase"; // Certifique-se de que 'db' está configurado corretamente

interface User {
  userId: string;
}

const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const auth = getAuth();

  const handleSearch = async () => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList: User[] = querySnapshot.docs.map((doc) => ({
        userId: doc.data().userId,
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    searchQuery,
    setSearchQuery,
    isLoading,
    setSelectedUserId,
    selectedUserId,
    handleSearch,
  };
};

export default useSearchUsers;

// const handleAddFriend = async () => {
//   if (selectedUserId) {
//     try {
//       await addFriend({ otherUserId: selectedUserId });
//       alert("Amigo adicionado com sucesso!");
//     } catch (error) {
//       console.error("Erro ao adicionar amigo:", error);
//     }
//   }
// };
