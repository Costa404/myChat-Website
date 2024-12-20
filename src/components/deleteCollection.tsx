import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteUsersCollection = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const deletePromises = querySnapshot.docs.map((document) =>
      deleteDoc(doc(db, "users", document.id))
    );

    await Promise.all(deletePromises);

    console.log(
      `Todos os documentos da coleção "users" foram apagados com sucesso.`
    );
  } catch (error) {
    console.error("Erro ao apagar documentos: ", error);
  }
};

deleteUsersCollection();
