import style from "./Header.module.css";
import React, { ReactNode } from "react";

type HeaderProps = {
  userIdName?: ReactNode;
  link?: ReactNode;
  userImg?: ReactNode;
  className?: string;
  title?: string;
};

const Header: React.FC<HeaderProps> = ({
  userIdName,
  link,
  userImg,
  title,
}) => {
  return (
    <section className={style.header}>
      {link && <div className={style.link}>{link}</div>}
      {title && <h1>{title}</h1>}

      <div>
        {userIdName && <h6 className={style.userIdName}>{userIdName}</h6>}
        {userImg && <span> {userImg}</span>}
      </div>
    </section>
  );
};

export default Header;
