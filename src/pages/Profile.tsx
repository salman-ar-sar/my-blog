import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Article } from "../types/article";
import ArticleContainer from "./ArticleContainer";
import "./Profile.scss";

const Profile = () => {
  const [{ user }] = useCookies(["user"]);
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
      {articles && <ArticleContainer articles={articles} />}
    </div>
  );
};

export default Profile;
