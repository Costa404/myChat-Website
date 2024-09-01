import React from "react";
import style from ".//BtnAuthentication.module.css";

interface BtnProps {
  loginAndSignUp: "login" | "signup";
  setLoginAndSignUp: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}

const Btn: React.FC<BtnProps> = ({ loginAndSignUp, setLoginAndSignUp }) => {
  return (
    <div className={style.container}>
      <div
        className={`${style.highlight} ${
          loginAndSignUp === "login" ? style.login : style.signup
        }`}
      />
      <button onClick={() => setLoginAndSignUp("login")}>LOG IN</button>
      <button onClick={() => setLoginAndSignUp("signup")}>SIGN UP</button>
    </div>
  );
};

export default Btn;
