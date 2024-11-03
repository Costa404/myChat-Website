import React from "react";
import useLogOut from "../../Authentication/hooksAuthentication/useLogout";
import style from "./homepage.module.css";

import { useUser } from "../../Users/userContext";
import ProfileImage from "../../Users/UserImg/ProfileImg";
import styleHeader from "../../Header/Header.module.css";
import MainUsers from "./SubHomepage/MainUsers/MainUsers";

const Homepage: React.FC = () => {
  const { handleLogOut } = useLogOut();
  const { userId } = useUser();

  return (
    <section className={`${style.geralContent}`}>
      <div></div>
      <div className={styleHeader.header}>
        <h6>{userId}</h6>
        <span>
          <ProfileImage userId={userId as string} />
        </span>
      </div>
      <div className={style.homepageCustomization}>
        <MainUsers currentUserId={userId || "Default "} />
        <div className={style.btnBottom}>
          <button onClick={handleLogOut}>LogOut</button>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
