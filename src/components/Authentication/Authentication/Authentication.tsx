import React from "react";
import useLogin from "./hooksAuthentication/useLogin";
import useSignup from "./hooksAuthentication/useSignup";
import style from "./Authentication.module.css";

const Authentication: React.FC = () => {
  const { handleLogin, email, setEmail, password, setPassword, error } =
    useLogin();
  const { handleSignUp } = useSignup();

  return (
    <section className={style.geralContent}>
      <div className={style.contentLeft}>
        <h1>myChat</h1>
        <span>
          Connect with friends and the world <br /> around you on myChat.
        </span>
      </div>

      <div className={style.contentRight}>
        <form className={style.contentRight} onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className={style.btnAuthentication}>
            <button type="submit">Login</button>
            <button type="button" onClick={handleSignUp}>
              Create Account
            </button>
          </div>

          {error && <p className={style.error}>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Authentication;
