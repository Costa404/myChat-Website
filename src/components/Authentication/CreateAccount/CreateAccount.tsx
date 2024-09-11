import style from "./CreateAccount.module.css";
import InputEmailPassword from "../hooksAuthentication/InputEmailPassword";
import styleAuthentication from "../Authentication.module.css";
import { useUser } from "../../Users/userContext";
import useSignup from "./useSignup";
import { useImgUpload } from "../../Users/UserImg/useImgUpload";
import { useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { useCheckUserId } from "./useCheckUserId";

type CreateAccountType = {
  className?: string;
  children?: React.ReactNode;
  friendId: string;
};

const CreateAccount: React.FC<CreateAccountType> = ({
  className,
  friendId,
}) => {
  const { userId, setUserId } = useUser();
  const { handleSignUp } = useSignup();
  const { selectedImg, handleImgChange, uploadImage } = useImgUpload();
  const [emailPassword, setEmailPassword] = useState<"defined" | "undefined">(
    "undefined"
  );
  const { checkUserId } = useCheckUserId(userId as string, friendId);

  // Função para lidar com a primeira etapa
  const handleFirstStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSignUp(e); // Aqui você passa o userId

    setEmailPassword("defined");
  };

  // Função para lidar com a segunda etapa
  const handleSecondStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId) {
      await checkUserId(); // Verifica se userId é válido
    } else {
      console.error("userId está indefinido.");
    }
    await uploadImage();
  };

  return (
    <div className={style.containerCreateAccount}>
      {emailPassword === "undefined" ? (
        <form onSubmit={handleFirstStep} className={style.formCustomization}>
          <InputEmailPassword className={className} />
          <div className={styleAuthentication.btnAuthentication}>
            <button type="submit">
              <GrLinkNext />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSecondStep} className={style.formCustomization}>
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
          <input
            className={style.inputFile}
            type="file"
            onChange={handleImgChange}
          />
          {selectedImg && (
            <img src={URL.createObjectURL(selectedImg)} alt="Selected" />
          )}
          <div className={styleAuthentication.btnAuthentication}>
            <button type="submit">Criar Conta</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateAccount;
