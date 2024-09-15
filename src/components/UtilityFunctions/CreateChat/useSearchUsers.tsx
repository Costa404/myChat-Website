import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importar o Firebase Authentication
import { db } from "../../../firebase"; // Certifique-se de que 'db' está configurado corretamente

interface User {
  userId: string;
  email: string;
}

const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [refreshSearchUsers, setRefreshSeachUsers] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSearch = async () => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      // Mapeando para incluir o email e userId
      const usersList: User[] = querySnapshot.docs.map((doc) => ({
        userId: doc.data().userId,
        email: doc.data().email, // Certifique-se que 'email' está no Firestore
      }));

      // Filtrar todos os usuários, exceto o usuário autenticado
      const filteredUsers = usersList.filter(
        (user) => user.email !== currentUser?.email
      );

      console.log(filteredUsers);

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [refreshSearchUsers]); // Cham

  return {
    users,
    searchQuery,
    setSearchQuery,
    isLoading,
    setSelectedUserId,
    selectedUserId,
    handleSearch,
    setRefreshSeachUsers,
  };
};

export default useSearchUsers;
