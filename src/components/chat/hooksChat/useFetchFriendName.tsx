// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useUser } from "../../Users/userContext";
// import { getDoc, doc } from "firebase/firestore";
// import { db } from "../../../firebase";

// const useFetchFriendName = () => {
//   const { chatId } = useParams<{ chatId: string }>();
//   const { userId } = useUser();
//   const [friendName, setFriendName] = useState<string | null>(null);

//   const fetchFriendName = async (chatId: string, userId: string) => {
//     try {
//       const chatDoc = doc(db, "chats", chatId);
//       const chatSnapshot = await getDoc(chatDoc);
//       if (chatSnapshot.exists()) {
//         const chatData = chatSnapshot.data();
//         const participants = chatData.participants as string[];

//         console.log("Participants:", participants);
//         const friendId = participants.find((id) => id !== userId);

//         console.log("Determined friendId:", friendId);
//         if (friendId) {
//           setFriendName(friendId);
//         } else {
//           console.log("Nenhum amigo encontrado.");
//           setFriendName("Desconhecido");
//         }
//       } else {
//         console.log("Conversa não encontrada.");
//         setFriendName("Desconhecido");
//       }
//     } catch (error) {
//       console.error("Erro ao buscar o nome do amigo:", error);
//       setFriendName("Erro ao buscar nome");
//     }
//   };

//   useEffect(() => {
//     if (chatId && userId) {
//       console.log("chatId:", chatId);
//       console.log("userId:", userId);

//       fetchFriendName(chatId, userId);
//     }
//   }, [chatId, userId]);

//   const userName = friendName
//     ? friendName.charAt(0).toUpperCase() + friendName.slice(1)
//     : "";

//   return { userName };
// };

// export default useFetchFriendName;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../Users/userContext";

const useFetchFriendName = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { userId } = useUser();
  const [friendName, setFriendName] = useState<string | null>(null);

  const fetchFriendName = async (friendId: string) => {
    try {
      if (friendId !== null) {
        console.log(`friendId is set to: ${friendId}`);
        setFriendName(friendId);
      } else {
        console.log("friendId is still null, waiting for it to be set...");
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do amigo:", error);
      setFriendName("Erro ao buscar nome");
    }
  };

  useEffect(() => {
    if (chatId && userId) {
      console.log("chatId:", chatId);

      console.log("userId:", userId);

      const ids = chatId.split("-");

      const friendId = ids[0] === userId ? ids[1] : ids[0];

      console.log("friendId:", friendId);

      fetchFriendName(friendId);
    }
  }, [chatId, userId]);

  const userName = friendName
    ? friendName.charAt(0).toUpperCase() + friendName.slice(1)
    : "";

  return { userName };
};

export default useFetchFriendName;
