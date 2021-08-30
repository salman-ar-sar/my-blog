import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Article } from "../types/article";
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
      <div className="articleContainer">
        {articles?.map((article) => {
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
    </div>
  );
};

export default Profile;
