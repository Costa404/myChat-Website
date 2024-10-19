// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../../firebase";
// import { useGetEmailFromUsername } from "../hooksChat/useGetEmailFromUsername ";
// import useFetchFriendName from "./useFetchFriendName";

// export const useFetchPrivateKey = () => {
//   const { userName } = useFetchFriendName();
//   const { getEmailFromUsername } = useGetEmailFromUsername();
//   console.log("Calling privatekey with userName:", userName);
//   const fetchPrivateKey = async () => {
//     if (!userName) {
//       console.error("userName is undefined. Cannot fetch private key.");
//       return null;
//     }
//     console.log("Calling privatekey with userName:", userName);

//     // Fetch do email usando o userName
//     const userEmail = await getEmailFromUsername();

//     try {
//       console.log("Fetching email for userName:", userEmail);

//       if (!userEmail) {
//         console.error("User email is undefined. Cannot fetch private key.");
//         return null;
//       }

//       console.log("Fetching private key for userEmail:", userEmail);
//       const docRef = doc(db, "users", userEmail); // Usa o userEmail diretamente como o identificador do documento
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const privateKey = docSnap.data().privateKey; // Acessa a chave privada
//         // console.log("Private key found:", privateKey);
//         return privateKey;
//       } else {
//         console.error("Private key not found for userEmail:", userEmail);
//         return null;
//       }
//     } catch (error) {
//       console.error(
//         "Error fetching private key for userEmail:",
//         userEmail,
//         error
//       );
//       return null;
//     }
//   };

//   return { fetchPrivateKey };
// };
