import React, { useState } from "react";
import style from "./Authentication.module.css";

import InputEmailPassword from "./hooksAuthentication/InputEmailPassword";
import useLogin from "./hooksAuthentication/useLogin";

import Btn from "./BtnAuthentication/BtnAuthentication";
import CreateAccount from "./CreateAccount/CreateAccount";

type AuthenticationProps = {
  friendId?: string;
};

const Authentication: React.FC<AuthenticationProps> = ({ friendId }) => {
  // const { isVisible, handleButtonClick } = useCreateAccountToggle();
  const { handleLogin } = useLogin();

  const [loginAndSignUp, setLoginAndSignUp] = useState<"login" | "signup">(
    "login"
  );

  return (
    <section className={style.mainContainer}>
      <div className={style.leftContainer}>
        <div className={style.contentLeft}>
          <h1>myChat</h1>
          <span>Connect with friends and the world around you on myChat.</span>
        </div>
      </div>
      <div className={style.rightContainer}>
        <div className={style.rightContent}>
          <span>
            <Btn
              loginAndSignUp={loginAndSignUp}
              setLoginAndSignUp={setLoginAndSignUp}
            />
          </span>
          {loginAndSignUp === "login" ? (
            <form className={style.subContentRight} onSubmit={handleLogin}>
              <InputEmailPassword className={style.input} />
              <h6>FORGOT PASSWORD?</h6>
              <div className={style.btnAuthentication}>
                <button type="submit">Login</button>
              </div>
            </form>
          ) : (
            <CreateAccount friendId={friendId as string} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Authentication;

// <input
//   className={style.inputUser}
//   type="text"
//   name="userId"
//   id="userId"
//   placeholder="userId"
//   value={userId ?? ""} // Converte null para string vazia
//   onChange={(e) => setUserId(e.target.value)}
//   required
// />

// <input
//   className={style.inputFile}
//   type="file"
//   onChange={handleImgChange}
//   // required
// />

// {selectedImg && (
//   <img src={URL.createObjectURL(selectedImg)} alt="Selected" />
// )}
