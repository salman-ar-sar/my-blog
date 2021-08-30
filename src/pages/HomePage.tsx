import { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ThemeContext } from "../components/Contexts";
import { Article } from "../types/article";
import ArticleContainer from "../components/ArticleContainer";
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
      {articleList && <ArticleContainer articles={articleList} />}
    </>
  );
};

export default HomePage;
