import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useUser } from "../../Users/userContext";
import { useParams } from "react-router-dom";

const useFetchFriendId = () => {
  const { userId } = useUser();
  const { chatId } = useParams<{ chatId: string }>();
  const [friendName, setFriendName] = useState<string | null>(null);

  const fetchFriendId = async (friendId: string): Promise<string | null> => {
    try {
      const userDocRef = doc(db, "users", friendId);
      const userDocSnap = await getDoc(userDocRef);
      console.log("Fetched document:", userDocSnap.data()); // Log fetched data
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        return userData?.name || null;
      }
    } catch (error) {
      console.error("Error fetching friend's name:", error);
    }
    return null;
  };

  const getFriend = () => {
    if (!chatId || !userId) {
      console.error("ChatId or UserId missing");
      return null;
    }
    const ids = chatId.split("-");
    const friendId = ids[0] === userId ? ids[1] : ids[0];
    console.log("Determined friendId:", friendId); // Log determined friendId
    return friendId;
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const friendId = getFriend();
      if (friendId) {
        try {
          const name = await fetchFriendId(friendId);
          console.log("Fetched friendName:", name); // Log fetched friendName
          setFriendName(name);
        } catch (error) {
          console.error("Error fetching friend's name:", error);
        }
      }
    };

    fetchUserId();
  }, [chatId, userId]);

  return { friendName };
};

export default useFetchFriendId;
