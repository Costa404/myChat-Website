import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styleHeader from "../../../Header/Header.module.css";

import useFetchFriendName from "../chatLogic/hooksChat/useFetchFriendName";
import ProfileImage from "../../../Users/UserImg/ProfileImg";

interface HeaderProps {
  userId: string;
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  const { userName } = useFetchFriendName();

  return (
    <section className={styleHeader.header}>
      <div className={styleHeader.headerLeft}>
        <Link to="/homepage">
          <button>
            <IoArrowBack />
          </button>
        </Link>
        <h1>{userName || "Nome do Amigo Padrão"}</h1>
      </div>
      <div className={styleHeader.headerChatCustom}>
        <ProfileImage userId={userId} />
      </div>
    </section>
  );
};

export default Header;
