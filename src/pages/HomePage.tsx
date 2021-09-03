import { useContext } from "react";
import { useCookies } from "react-cookie";
import { ThemeContext } from "../components/Contexts";
import { Article } from "../types/types";
import ArticleContainer from "../components/ArticleContainer";
import "./HomePage.scss";
import useFetch from "../components/useFetch";

const HomePage: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [{ user }] = useCookies<"user", { user: string }>(["user"]);

  const {
    data: articleList,
    isPending,
    errorMsg,
  } = useFetch<Article[]>("http://localhost:8000/articles");

  return (
    <>
      <h1 className={darkMode ? "dark" : "light"}>
        {user
          ? `Welcome back, ${user[0].toUpperCase() + user.slice(1)}!`
          : "Welcome to my blog!"}
      </h1>
      {isPending && <div className="loadingMsg">Loading...</div>}
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
      {articleList && <ArticleContainer articles={articleList} />}
    </>
  );
};

export default HomePage;
