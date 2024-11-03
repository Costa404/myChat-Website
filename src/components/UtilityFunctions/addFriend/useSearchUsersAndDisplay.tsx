// import { useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../firebase"; // Ajuste o caminho conforme necessário

// interface User {
//   userId: string;
//   name: string;
// }

// const useSearchUsers = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = async () => {
//     try {
//       // Acessando a coleção "Users" no Firestore
//       const querySnapshot = await getDocs(collection(db, "users"));

//       // Mapeando os documentos para o formato de usuário
//       const usersList: User[] = querySnapshot.docs.map((doc) => ({
//         userId: doc.id,
//         ...doc.data(),
//       })) as User[];

//       // Filtrando usuários com base na consulta de pesquisa
//       const filteredUsers = usersList.filter((user) =>
//         user.userId.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       // Atualizando o estado com os usuários encontrados
//       setUsers(filteredUsers);
//     } catch (error) {
//       console.error("Erro ao buscar usuários:", error);
//     }
//   };

//   return {
//     users,
//     searchQuery,
//     setSearchQuery,
//     handleSearch,
//   };
// };

// export default useSearchUsers;
