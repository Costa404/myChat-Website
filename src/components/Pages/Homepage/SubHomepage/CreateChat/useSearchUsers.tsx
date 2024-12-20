import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../../firebase";

interface User {
  userId: string;
  email: string;
}

const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersList: User[] = snapshot.docs.map((doc) => ({
        userId: doc.data().userId,
        email: doc.data().email,
      }));

      const filteredUsers = usersList.filter(
        (user) => user.email !== currentUser?.email
      );

      setUsers(filteredUsers);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    users,
    searchQuery,
    setSearchQuery,
    isLoading,
    setSelectedUserId,
    selectedUserId,
  };
};

export default useSearchUsers;
