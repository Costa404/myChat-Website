import React, { useState } from "react";

import { addFriend } from "./addFriend/addFriend";
import { useUser } from "../Users/userContext";

// Defina o tipo para os resultados de busca
type User = {
  id: string;
  userId: string; // Ou qualquer outra propriedade que você esteja usando
};

// Defina as props aceitas pelo componente FriendSearch
type FriendSearchProps = {
  onSelect: (friendId: string) => void;

  className?: string; // Adiciona a propriedade onAddFriend
};

const FriendSearch: React.FC<FriendSearchProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Defina searchQuery como string
  const [searchResults, setSearchResults] = useState<User[]>([]); // Defina o tipo dos resultados de busca
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Defina selectedUser com o tipo correto
  const { userId } = useUser();

  const handleSearch = async () => {
    const results = await addNewFriend(searchQuery); // Passa searchQuery como string
    setSearchResults(results);
  };

  const handleAddFriend = async () => {
    if (selectedUser && userId !== null) {
      try {
        const friendData = {
          userId: userId,
          otherUserId: selectedUser.id,
        };
        await addFriend(friendData);
        console.log("Amigo adicionado com sucesso!");

        // Chama a função onAddFriend após adicionar um amigo
        // if (onAddFriend) {
        //   onAddFriend();
        // }

        // Chama a função onSelect com o ID do amigo selecionado
        if (onSelect) {
          onSelect(selectedUser.id);
        }

        setSelectedUser(null);
        setSearchResults([]);
      } catch (error) {
        console.error("Erro ao adicionar amigo:", error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for users..."
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((user) => (
            <li key={user.id} onClick={() => setSelectedUser(user)}>
              {user.userId}
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div>
          <p>Selected User: {selectedUser.userId}</p>
          <button onClick={handleAddFriend}>Add Friend</button>
        </div>
      )}
    </div>
  );
};

export default FriendSearch;
