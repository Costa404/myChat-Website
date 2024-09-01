import React, { useState } from "react";
import style from "./Authentication.module.css";

import FormContent from "./hooksAuthentication/InputEmailPassword";
import useLogin from "./hooksAuthentication/useLogin";

import Btn from "./BtnAuthentication/BtnAuthentication";
import CreateAccount from "./CreateAccount/CreateAccount";

const Authentication: React.FC = () => {
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
              <FormContent />
              <h6>FORGOT PASSWORD?</h6>
              <div className={style.btnAuthentication}>
                <button type="submit">Login</button>
              </div>
            </form>
          ) : (
            <CreateAccount />
          )}
        </div>
      </div>
    </section>
  );
};

export default Authentication;
