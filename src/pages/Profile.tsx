import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { Article } from "../types/types";
import ArticleContainer from "../components/ArticleContainer";
import useFetch from "../components/useFetch";
import "./Profile.scss";

const Profile = () => {
  const [{ user }] = useCookies(["user"]);
  const { darkMode } = useContext(ThemeContext);

  const {
    data: articles,
    isPending,
    errorMsg,
  } = useFetch<Article[]>(
    "http://localhost:8000/articles?author=Enid%20Blyton"
  );

  return (
    <div className="profilePage">
      {user ? <h2>Welcome {user}!</h2> : <h2>Not logged in!</h2>}
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
            <h2 className="userName">{user}</h2>
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
