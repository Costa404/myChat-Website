// import React, { useState, useEffect } from "react";
// import useLogOut from "../../Authentication/hooksAuthentication/useLogout";
// import style from "./homepage.module.css";
// import MainUsers from "../../UtilityFunctions/CreateChat/MainUsers/MainUsers";
// import { useUser } from "../../Users/userContext";
// import ProfileImage from "../../Users/UserImg/ProfileImg";
// import styleHeader from "../../Header/Header.module.css";
// import { useStartChat } from "../../UtilityFunctions/CreateChat/useStartChat";

// const Homepage: React.FC = () => {
//   const { startChat, chatId } = useStartChat();
//   const [loading, setLoading] = useState(true);
//   const { handleLogOut } = useLogOut();
//   const { userId } = useUser();

//   useEffect(() => {
//     if (userId) {
//       setLoading(false);
//     }
//   }, [userId]);

//   if (loading) {
//     return <div>Carregando...</div>;
//   }

//   return (
//     <section className={style.geralContent}>
//       <div className={styleHeader.header}>
//         <h6>{userId}</h6>
//         <button onClick={handleLogOut}>LogOut</button>
//         <span>
//           <ProfileImage userId={userId as string} />
//         </span>
//       </div>
//       <div className={style.homepageCustomization}>
//         <MainUsers
//           currentUserId={userId || "Default"}
//           onStartChat={startChat}
//         />
//         {chatId && <div>Chat ID: {chatId}</div>}
//       </div>
//     </section>
//   );
// };

// export default Homepage;
import React from "react";

import useLogOut from "../../Authentication/hooksAuthentication/useLogout";
import style from "./homepage.module.css";

import MainUsers from "../../UtilityFunctions/CreateChat/MainUsers/MainUsers";
import { useUser } from "../../Users/userContext";
import ProfileImage from "../../Users/UserImg/ProfileImg";
import styleHeader from "../../Header/Header.module.css";

const Homepage: React.FC = () => {
  // const [chatId, setChatId] = useState<string | null>(null);
  // Estado de carregamento
  const { handleLogOut } = useLogOut();
  const { userId } = useUser();

  // useEffect(() => {
  //   if (userId) {
  //     setLoading(false); // Define o carregamento como falso quando o userId estiver disponível
  //   }
  // }, [userId]);

  //   const newChatId = await createChat(userId, friendId);
  //   console.log("aqui", newChatId);
  //   if (newChatId) {
  //     setChatId(newChatId); // Atualize o estado com o chatId gerado ou existente
  //   }
  // };

  // Se o estado de carregamento for verdadeiro, mostra o indicador de carregamento
  // if (loading) {
  //   return <div>Carregando...</div>;
  // }

  return (
    <section className={style.geralContent}>
      <div className={styleHeader.header}>
        <h6>{userId}</h6>

        <span>
          <ProfileImage userId={userId as string} />
        </span>
      </div>
      <div className={style.homepageCustomization}>
        <MainUsers
          currentUserId={userId || "Default "}
          // onStartChat={startChat}
        />

        {/* <div>
          {chatId && (
            <Link to={`/chat/${chatId}`}>
              <button>Ir para Chat</button>
            </Link>
          )}
        </div> */}
        <div className={style.btnBottom}>
          <button onClick={handleLogOut}>LogOut</button>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
