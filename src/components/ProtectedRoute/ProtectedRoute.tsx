// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../Users/userContext";

const ProtectedRoute = () => {
  // const { userId } = useUser();
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true); // Controla o estado de carregamento
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     // if (userId === undefined) {
  //     //   // Espera até que o `userId` seja definido
  //     //   setLoading(true);
  //     // } else if (!userId) {
  //     //   // Se `userId` não estiver presente, redireciona
  //       // navigate("/");
  //     } else {
  //       // Se `userId` estiver presente, para o carregamento
  //       setLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, [userId, navigate]);
  // // Impede a renderização e navegação até que a autenticação esteja resolvida
  // // if (loading || userId === undefined) {
  // //   return <div>Loading...</div>;
  // // }
  // return children; // Renderiza o componente filho se `userId` estiver autenticado
};

export default ProtectedRoute;
