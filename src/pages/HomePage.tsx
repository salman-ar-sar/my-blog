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
  const [isPending, setIsPending] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = useCallback(() => {
    fetch("http://localhost:8000/articles")
      .then((response) => {
        if (!response.ok) {
          throw Error("Couldn't fetch");
        }
        setErrorMsg("");
        return response.json();
      })
      .then((articles) => setArticleList(articles))
      .catch((error) => setErrorMsg(error.message))
      .finally(() => setIsPending(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h1 className={darkMode ? "dark" : "light"}>
        {user ? `Welcome back, ${user}!` : "Welcome to my blog!"}
      </h1>
      {isPending && <div>Loading...</div>}
      {errorMsg && <div>{errorMsg}</div>}
      {articleList && <ArticleContainer articles={articleList} />}
    </>
  );
};

export default HomePage;
