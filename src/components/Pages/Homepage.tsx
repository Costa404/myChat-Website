import useLogOut from "../Authentication/Authentication/hooksAuthentication/useLogout";
import { Link } from "react-router-dom";
import style from "./homepage.module.css";

const Homepage = () => {
  const { handleLogOut } = useLogOut();

  return (
    <div>
      <Link to="/chat">
        <button className={style.btnChat}>chat</button>
      </Link>
      {/* <UseChat /> */}
      <button onClick={handleLogOut}>LogOut</button>
      {/* <div className="addRemove">
        <FetchDataPlayers />
        <RemovePlayer />
        <AddPlayerStats />
      </div> */}
    </div>
  );
};

export default Homepage;
