import { useCookies } from "react-cookie";

const Profile = () => {
  const [{ user }] = useCookies(["user"]);

  return <div>{user ? <h2>Welcome {user}!</h2> : <h2>Not logged in!</h2>}</div>;
};

export default Profile;
