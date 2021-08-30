import { Link } from "react-router-dom";
import { Article } from "../types/article";

interface Props {
  articles: Article[];
}

const ArticleContainer = ({ articles }: Props) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default ArticleContainer;
