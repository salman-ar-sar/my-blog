import { useContext } from "react";
import { LoginContext } from "../components/Contexts";

const Profile = () => {
  const { user } = useContext(LoginContext);
  return <div>{user ? <h2>Welcome {user}!</h2> : <h2>Not logged in!</h2>}</div>;
};

export default Profile;
