import { Link, useLocation } from "react-router-dom";
import { Article } from "../types/article";
import "./ArticleContainer.scss";

interface Props {
  articles: Article[];
}

const ArticleContainer = ({ articles }: Props) => {
  let location = useLocation();

  return (
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
            {location.pathname === "/profile" && <button>Delete</button>}
          </div>
        );
      })}
    </div>
  );
};

export default ArticleContainer;
