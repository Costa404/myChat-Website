import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Importa sua instância do Firestore

// Função para deletar todos os documentos da coleção "users"
export const deleteUsersCollection = async () => {
  try {
    const usersCollectionRef = collection(db, "users"); // Referência da coleção "users"
    const querySnapshot = await getDocs(usersCollectionRef); // Obtém todos os documentos da coleção

    // Percorre cada documento na coleção e o apaga
    const deletePromises = querySnapshot.docs.map((document) =>
      deleteDoc(doc(db, "users", document.id))
    );

    // Aguarda a exclusão de todos os documentos
    await Promise.all(deletePromises);

    console.log(
      `Todos os documentos da coleção "users" foram apagados com sucesso.`
    );
  } catch (error) {
    console.error("Erro ao apagar documentos: ", error);
  }
};

// Chame a função para apagar todos os documentos da coleção "users"
deleteUsersCollection();
