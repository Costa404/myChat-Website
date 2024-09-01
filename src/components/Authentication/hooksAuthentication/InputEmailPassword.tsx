import useLogin from "./useLogin";

import style from "../CreateAccount/CreateAccount.module.css";
type InputEmailPasswordType = {
  className?: string;
  children?: React.ReactNode;
};

const InputEmailPassword: React.FC<InputEmailPasswordType> = () => {
  const { email, setEmail, password, setPassword } = useLogin();

  return (
    <div className={style.inputFieldContainer}>
      <input
        placeholder="Email:"
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Password:"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
  );
};

export default InputEmailPassword;