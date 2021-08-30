import { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { Article } from "../types/article";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [{ user }] = useCookies(["user"]);

  const [articleList, setArticleList] = useState<Article[]>();

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((articles) => setArticleList(articles))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h1 className={darkMode ? "dark" : "light"}>
        {user ? `Welcome back, ${user}!` : "Welcome to my blog!"}
      </h1>
      <div className="articleContainer">
        {articleList?.map((article) => {
          return (
            <div className="article" key={article.id}>
              <Link to={"/article/" + article.id}>
                <p className="title">{article.title}</p>
              </Link>
              <img
                src={`https://picsum.photos/300/200?random=${article.id}`}
                alt="article"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
