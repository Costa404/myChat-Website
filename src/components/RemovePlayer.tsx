// import { DeletePlayer } from "../firebase";
// import { useState } from "react";

// const RemovePlayer = () => {
//   const [playerId, setPlayerId] = useState<string>("");

//   // A função handleDelete não precisa de argumentos, já que o playerId é armazenado no estado.
//   const handleDelete = async () => {
//     if (playerId.trim()) {
//       try {
//         await DeletePlayer(playerId.trim());
//         setPlayerId(""); // Limpa o input após a exclusão
//       } catch (error) {
//         console.log("Error deleting player", error);
//       }
//     }
//   };

//   return (
//     <div className="remove">
//       <label htmlFor="DeletePlayer">Delete Player</label>
//       <input
//         type="text"
//         id="DeletePlayer"
//         value={playerId}
//         onChange={(e) => setPlayerId(e.target.value)}
//         required
//       />
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default RemovePlayer;
