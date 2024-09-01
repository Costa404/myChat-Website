import style from "./CreateAccount.module.css";

import InputEmailPassword from "../hooksAuthentication/InputEmailPassword";

import styleAuthentication from "../Authentication.module.css";

import { useUser } from "../../Users/userContext";

import useSignup from "./useSignup";
import { useImgUpload } from "../../Users/useImgUpload";

type CreateAccountType = {
  className?: string;

  children?: React.ReactNode;
};

const CreateAccount: React.FC<CreateAccountType> = ({ className }) => {
  const { userId, setUserId } = useUser();

  const { handleSignUp } = useSignup();

  const { selectedImg, handleImgChange, uploadImage } = useImgUpload();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await uploadImage(); // Chama a função uploadImage antes de submeter o formulário

    handleSignUp(e);
  };

  return (
    <div className={style.containerCreateAccount}>
      <section className={style.geralStyle}>
        <div>
          <form className={style.formCustomization} onSubmit={handleSubmit}>
            <InputEmailPassword className={className} />

            <input
              className={style.inputUser}
              type="text"
              name="userId"
              id="userId"
              placeholder="userId"
              value={userId ?? ""} // Converte null para string vazia
              onChange={(e) => setUserId(e.target.value)}
              required
            />

            <input type="file" onChange={handleImgChange} />

            {selectedImg && (
              <img src={URL.createObjectURL(selectedImg)} alt="Selected" />
            )}

            <div className={styleAuthentication.btnAuthentication}>
              <button type="submit">CREATE ACCOUNT</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateAccount;
