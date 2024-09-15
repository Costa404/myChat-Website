import React from "react";
import useSearchUsers from "../useSearchUsers";
import style from "./MainUsers.module.css";
import ProfileImage from "../../../Users/UserImg/ProfileImg";
import { useNavigate } from "react-router-dom";

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

    setSelectedUserId,
    selectedUserId,
  } = useSearchUsers();

  // useEffect(() => {
  //   handleSearch();
  // }, [handleSearch]);

  const navigate = useNavigate();
  const handleClick = (chatId: string) => {
    setSelectedUserId(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <section className={style.geralContentUsers}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar usuários..."
      />
      {/* <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Carregando..." : "Buscar"}
      </button> */}
      <button>
        {" "}
        <ul className={style.displayUsers}>
          {users.map((user) => (
            <div
              key={user.userId}
              className={style.contentDispalyUsers}
              onClick={() => handleClick(user.userId)}
            >
              <ProfileImage userId={user.userId} />
              <span>{user.userId}</span>
            </div>
          ))}
        </ul>
      </button>
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
    </section>
  );
};

export default MainUsers;
