import React from "react";
import useSearchUsers from "../addFriend/useSearchUsers";

// Gerar um novo UUID
interface MainUsersProps {
  currentUserId: string;
  onStartChat: (friendId: string) => void; // Função de callback para iniciar o chat
}

const MainUsers: React.FC<MainUsersProps> = ({
  // currentUserId,
  onStartChat,
}) => {
  const {
    // handleAddFriend,
    users,
    searchQuery,
    setSearchQuery,
    isLoading,
    setSelectedUserId,
    selectedUserId,
    handleSearch,
  } = useSearchUsers();

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar usuários..."
      />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Carregando..." : "Buscar"}
      </button>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.userId}
              onClick={() => setSelectedUserId(user.userId)}
            >
              {user.userId}
            </li>
          ))
        ) : (
          <li>Nenhum usuário encontrado</li>
        )}
      </ul>
      {selectedUserId && (
        <div>
          <p>Selecionado: {selectedUserId}</p>
          {/* <button onClick={() => handleAddFriend()}>
            Adicionar Novo Amigo
          </button> */}
          <button onClick={() => onStartChat(selectedUserId)}>
            Iniciar Chat
          </button>{" "}
          {/* Botão para iniciar o chat */}
        </div>
      )}
    </div>
  );
};

export default MainUsers;
