import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogOut from "../../Authentication/hooksAuthentication/useLogout";
import style from "./homepage.module.css";

import { createChat } from "../../UtilityFunctions/CreateChat/createChat";
import MainUsers from "../../UtilityFunctions/CreateChat/MainUsers";
import { useUser } from "../../Users/userContext";
import ProfileImage from "../../Users/UserImg/ProfileImg";

const Homepage: React.FC = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const { handleLogOut } = useLogOut();
  const { userId } = useUser();

  useEffect(() => {
    if (userId) {
      setLoading(false); // Define o carregamento como falso quando o userId estiver disponível
    }
  }, [userId]);

  const startChat = async (friendId: string) => {
    if (!userId) {
      console.error("User ID não está disponível.");
      return;
    }

    const newChatId = await createChat(userId, friendId);
    if (newChatId) {
      setChatId(newChatId); // Atualize o estado com o chatId gerado ou existente
    }
  };

  // Se o estado de carregamento for verdadeiro, mostra o indicador de carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className={style.geralContent}>
      {/* <Header
        userIdName={userId}
        title="myChat"
        userImg={<ProfileImage userId={userId as string} />}
      /> */}
      <section className={style.header}>
        {/* <div className={style.link}>{link}</div> */}

        <div>
          <h6 className={style.userIdName}></h6>
          <span>
            {" "}
            <ProfileImage userId={userId as string} />
          </span>
        </div>
      </section>
      <div className={style.homepageCustomization}>
        <MainUsers
          currentUserId={userId || "Default "}
          onStartChat={startChat}
        />
        <button onClick={handleLogOut}>LogOut</button>
      </div>
      <div>
        {chatId && (
          <Link to={`/chat/${chatId}`}>
            <button>Ir para Chat</button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Homepage;
