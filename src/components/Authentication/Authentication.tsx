import React, { useState } from "react";
import style from "./Authentication.module.css";

import InputEmailPassword from "./hooksAuthentication/InputEmailPassword";
import useLogin from "./hooksAuthentication/useLogin";

import Btn from "./BtnAuthentication/BtnAuthentication";
import CreateAccount from "./CreateAccount/CreateAccount";
import AnimatedText from "./Animation";

// import CreateAccount from "./CreateAccount/CreateAccount";

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
      <div className={style.contentAuth}>
        <div className={style.contentLeft}>
          {" "}
          <AnimatedText />
          <p>Connect with friends and the world around you on myChat.</p>
        </div>

        <div className={style.contentRight}>
          <span className={style.btnSwitch}>
            <Btn
              loginAndSignUp={loginAndSignUp}
              setLoginAndSignUp={setLoginAndSignUp}
            />
            <InputEmailPassword className={style.input} />
          </span>
          {loginAndSignUp === "login" ? (
            <form className={style.subContentRight} onSubmit={handleLogin}>
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
    // </section>
  );
};

export default Authentication;
// import React, { useState } from "react";
// import style from "./Authentication.module.css";

// import InputEmailPassword from "./hooksAuthentication/InputEmailPassword";
// import useLogin from "./hooksAuthentication/useLogin";

// import Btn from "./BtnAuthentication/BtnAuthentication";
// import CreateAccount from "./CreateAccount/CreateAccount";

// type AuthenticationProps = {
//   friendId?: string;
// };

// const Authentication: React.FC<AuthenticationProps> = ({ friendId }) => {
//   // const { isVisible, handleButtonClick } = useCreateAccountToggle();

//   const { handleLogin } = useLogin();

//   const [loginAndSignUp, setLoginAndSignUp] = useState<"login" | "signup">(
//     "login"
//   );

//   return (
//     <section className={style.mainContainer}>
//       {/* <div className={style.leftContainer}>
//         <div className={style.contentLeft}> */}

//       {/* </div>
//       </div> */}
//       <section className={style.ContainerAuth}>
//         <div className={style.contentAuth}>
//           <div>
//             {" "}
//             <span>
//               {" "}
//               <h1>myChat</h1>
//               <span>
//                 Connect with friends and the world around you on myChat.
//               </span>
//             </span>
//           </div>
//           <div>
//             <span>
//               <Btn
//                 loginAndSignUp={loginAndSignUp}
//                 setLoginAndSignUp={setLoginAndSignUp}
//               />
//             </span>
//             {loginAndSignUp === "login" ? (
//               <form className={style.subContentRight} onSubmit={handleLogin}>
//                 <InputEmailPassword className={style.input} />
//                 <h6>FORGOT PASSWORD?</h6>
//                 <div className={style.btnAuthentication}>
//                   <button type="submit">Login</button>
//                 </div>
//               </form>
//             ) : (
//               <CreateAccount friendId={friendId as string} />
//             )}
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default Authentication;
