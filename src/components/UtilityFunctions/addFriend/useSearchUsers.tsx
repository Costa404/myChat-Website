import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
// import useAddFriend from "./useAddFriend";

interface User {
  userId: string;
}

const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  // const { addFriend } = useAddFriend();
  // const { addFriend } = useAddFriend();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList: User[] = querySnapshot.docs.map((doc) => ({
        userId: doc.data().userId,
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return {
    // handleAddFriend,
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
