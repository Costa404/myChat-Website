import React from "react";
import useSearchUsers from "../useSearchUsers";
import style from "./MainUsers.module.css";
import ProfileImage from "../../../Users/UserImg/ProfileImg";
import { useNavigate } from "react-router-dom";
// Supondo que createChat seja uma função que cria um chat no Firebase
import { useUser } from "../../../Users/userContext"; // Pegar o userId do contexto
import { createChat } from "../createChat";

interface MainUsersProps {
  currentUserId: string;
}

const MainUsers: React.FC<MainUsersProps> = () => {
  const {
    users,
    searchQuery,
    setSearchQuery,
    setSelectedUserId,
    selectedUserId,
  } = useSearchUsers();

  const { userId } = useUser(); // Pegando o userId do contexto
  const navigate = useNavigate();

  const startChat = async (friendId: string) => {
    console.log("Iniciando chat com:", friendId);

    if (!userId) {
      console.error("User ID não está disponível.");
      return;
    }

    try {
      const newChatId = await createChat(userId, friendId); // Função para criar o chat no Firebase
      console.log("Chat criado com ID:", newChatId);
      navigate(`/chat/${newChatId}`); // Navegar para a página do chat
    } catch (error) {
      console.error("Erro ao criar o chat:", error);
    }
  };

  const handleClick = (userId: string) => {
    setSelectedUserId(userId);
    console.log("Usuário selecionado:", userId);
    startChat(userId); // Iniciar chat ao clicar no usuário
  };

  return (
    <section className={style.geralContentUsers}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar usuários..."
      />

      <ul className={style.displayUsers}>
        {users.map((user) => (
          <div
            key={user.userId}
            className={style.contentDispalyUsers}
            onClick={() => handleClick(user.userId)} // Iniciar chat ao clicar no usuário
          >
            <ProfileImage userId={user.userId} />
            <span>{user.userId}</span>
          </div>
        ))}
      </ul>

      {selectedUserId && (
        <div>
          <p>Selecionado: {selectedUserId}</p>
          <button onClick={() => startChat(selectedUserId)}>
            Iniciar Chat
          </button>
        </div>
      )}
    </section>
  );
};

export default MainUsers;
