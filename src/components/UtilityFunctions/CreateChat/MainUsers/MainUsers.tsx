import React, { useEffect } from "react";
import useSearchUsers from "../useSearchUsers";
import style from "./MainUsers.module.css";
import ProfileImage from "../../../Users/UserImg/ProfileImg";
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

    setSelectedUserId,
    selectedUserId,
    handleSearch,
  } = useSearchUsers();

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <section className={style.geralContent}>
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
            <div key={user.userId} className={style.contentDispalyUsers}>
              <ProfileImage userId={user.userId} />{" "}
              {/* Passando userId para ProfileImage */}
              <li
                onClick={() => {
                  console.log("Clicked userId:", user.userId);
                  setSelectedUserId(user.userId);
                }}
              >
                {user.userId}
              </li>
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
// import React from "react";
// import useSearchUsers from "../addFriend/useSearchUsers";
// import { useUser } from "../../Users/userContext";

// // Gerar um novo UUID
// interface MainUsersProps {
//   currentUserId: string;
//   onStartChat: (friendId: string) => void; // Função de callback para iniciar o chat
// }

// const MainUsers: React.FC<MainUsersProps> = ({
//   // currentUserId,
//   onStartChat,
// }) => {
//   const { userId } = useUser();
//   const {
//     // handleAddFriend,
//     users,
//     searchQuery,
//     setSearchQuery,
//     isLoading,
//     setSelectedUserId,
//     selectedUserId,
//     handleSearch,
//   } = useSearchUsers();

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Buscar usuários..."
//       />
//       <button onClick={handleSearch} disabled={isLoading}>
//         {isLoading ? "Carregando..." : "Buscar"}
//       </button>
//       <ul>
//         {users.length > 0 ? (
//           users.map((user) => (
//             <div>
//               <li
//                 key={user.userId}
//                 onClick={() => {
//                   console.log("Clicked userId:", user.userId);
//                   setSelectedUserId(user.userId);
//                 }}
//               >
//                 {user.userId}
//               </li>
//             </div>
//           ))
//         ) : (
//           <li>Nenhum usuário encontrado</li>
//         )}
//       </ul>
//       {selectedUserId && (
//         <div>
//           <p>Selecionado: {selectedUserId}</p>
//           {/* <button onClick={() => handleAddFriend()}>
//             Adicionar Novo Amigo
//           </button> */}
//           <button onClick={() => onStartChat(selectedUserId)}>
//             Iniciar Chat
//           </button>{" "}
//           {/* Botão para iniciar o chat */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainUsers;
