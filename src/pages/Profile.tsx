import { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { Article, User } from "../types/types";
import ArticleContainer from "../components/ArticleContainer";
import useFetch from "../components/useFetch";
import "./Profile.scss";

const Profile = () => {
  const [{ user }] = useCookies(["user"]);
  const { darkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/users/${user}`)
      .then((res) => res.json())
      .then((uname: User) => setUsername(uname.name))
      .catch((error) => console.error(error));
  }, [user]);

  const {
    data: articles,
    isPending,
    errorMsg,
  } = useFetch<Article[]>(
    `http://localhost:8000/articles?author=${username
      .trim()
      .replace(" ", "%20")}`
  );

  return (
    <div className="profilePage">
      {user ? <h2>Welcome {username}!</h2> : <h2>Not logged in!</h2>}
      {isPending && <div className="loadingMsg">Loading...</div>}
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
      {user && (
        <div className="profileContainer">
          {articles && <ArticleContainer articles={articles} />}
          <div className="profileDeets">
            <img
              className="userImage"
              src="https://image.flaticon.com/icons/png/512/1077/1077012.png"
              alt="user"
            />
            <h2 className="userName">{username}</h2>
            <p>145 followers</p>
            <p>{articles?.length} articles!</p>
            <div className="inputClass">
              <Link to="/post">
                <button className={darkMode ? "dark" : ""}>New Post +</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
