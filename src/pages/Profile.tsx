import { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { Article } from "../types/article";
import ArticleContainer from "../components/ArticleContainer";
import "./Profile.scss";

const Profile = () => {
  const [{ user }] = useCookies(["user"]);
  const { darkMode } = useContext(ThemeContext);
  const [articles, setArticles] = useState<Article[]>();

  const fetchData = useCallback(() => {
    fetch("../data.json")
      .then((response) => response.json())
      .then((articles: Article[]) => {
        const article: Article[] = articles.filter(
          (article) => article.author === "Enid Blyton"
        );
        setArticles(article);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="profilePage">
      {user ? <h2>Welcome {user}!</h2> : <h2>Not logged in!</h2>}
      <div className="profileContainer">
        {articles && <ArticleContainer articles={articles} />}
        {user && (
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
              <Link to={{ pathname: "/post", state: { prevPath: "/profile" } }}>
                <button className={darkMode ? "dark" : ""}>New Post +</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
