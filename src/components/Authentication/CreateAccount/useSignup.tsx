import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase"; // Certifique-se que db é o Firestore
import { doc, setDoc } from "firebase/firestore"; // Importa Firestore para salvar dados
import { useAuth } from "../hooksAuthentication/useAuthContext";
import { useError } from "../../errorContext/useError";
import { useState } from "react";
import { User } from "firebase/auth";

const useSignup = () => {
  const { email, password } = useAuth();
  const { setError } = useError();
  const [userInformation, setUserInformation] = useState<User | null>(null);

  const handleSignUp = async (userId: string) => {
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ================================

      // keys

      // ================================

      // const { privateKey, publicKey } = generateKeyPair();
      // if (!publicKey || !privateKey) throw new Error("Keys are not available");

      // ================================

      // JSEncrypt para criptografia e descriptografia

      // // ================================
      // const encryptor = new JSEncrypt(); // Cria uma instância do JSEncrypt
      // encryptor.setPublicKey(publicKey); // Define a chave pública para criptografar

      // // Criptografar
      // const encrypted = encryptor.encrypt("teste de mensagem");
      // if (!encrypted) throw new Error("Encryption failed");

      // console.log("Encrypted message:", encrypted);

      // // Para descriptografar
      // encryptor.setPrivateKey(privateKey); // Define a chave privada para descriptografar
      // const decrypted = encryptor.decrypt(encrypted);
      // console.log("Decrypted message:", decrypted); // Deve ser "teste de mensagem"

      // // ================================

      // Armazenar no Firestore

      // ================================

      await setDoc(doc(db, "users", email), {
        userId: userId,
        email: user.email,
        createdAt: new Date(),
      });

      console.log(
        "User created and added to Firestore with public and private keys:",
        userId
      );
      return true;
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Failed to create account. Please try again.");
      return false;
    }
  };

  return { handleSignUp, userInformation, setUserInformation };
};

export default useSignup;
