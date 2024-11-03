import style from "./CreateAccount.module.css";

import styleAuthentication from "../Authentication.module.css";
import { useUser } from "../../Users/userContext";
import useSignup from "./useSignup";
import { useImgUpload } from "../../Users/UserImg/useImgUpload";

import { useCheckUserId } from "./useCheckUserId";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useError } from "../../errorContext/useError";

type CreateAccountType = {
  className?: string;
  children?: React.ReactNode;
  friendId: string;
};

const CreateAccount: React.FC<CreateAccountType> = ({ friendId }) => {
  const { userId, setUserId } = useUser();
  const { handleSignUp } = useSignup();
  const { selectedImg, handleImgChange, uploadImage } = useImgUpload();
  const navigate = useNavigate();
  const [isSignUpComplete, setIsSignedUpComplete] = useState(false);

  const { checkUserId } = useCheckUserId(userId as string, friendId);

  useEffect(() => {
    if (userId && isSignUpComplete) {
      checkUserId(); // Só é chamado quando o userId é atualizado
    }
  }, [isSignUpComplete, userId]);

  // Função para lidar com a segunda etapa
  const handleSecondStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      return;
    }
    // Validação do userId
    // if (userId.charAt(0) !== userId.charAt(0).toLowerCase()) {
    //   setError("O nome de usuário deve começar com uma letra minúscula.");
    //   return; // Impede o envio se a validação falhar
    // }

    const signupSuccess = await handleSignUp(userId as string);

    if (signupSuccess) {
      setIsSignedUpComplete(true);
      await uploadImage();
      navigate("/homepage"); // Navega para a homepage apenas se o signup tiver sucesso
    }
  };

  return (
    <div className={style.containerCreateAccount}>
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
          required
        />
        {selectedImg && (
          <img src={URL.createObjectURL(selectedImg)} alt="Selected" />
        )}
        <div className={styleAuthentication.btnAuthentication}>
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
