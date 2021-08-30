import { useState, useCallback, useEffect } from "react";
import { match } from "react-router-dom";
import { Article } from "../types/article";
import "./Article.scss";

interface Params {
  id: string;
}

const ArticlePage = ({ match }: { match: match<Params> }) => {
  const [article, setArticle] = useState<Article>();
  const id = match.params.id;

  const fetchData = useCallback(() => {
    fetch(`http://localhost:8000/articles/${id}`)
      .then((response) => response.json())
      .then((article: Article) => {
        setArticle(article);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="articlePage">
      <h2>{article?.title}</h2>
      <h4>{article?.author}</h4>
      <figure>
        <img
          src={
            article?.image
              ? article.image
              : `https://picsum.photos/500/300?random=${article?.id}`
          }
          alt="article"
        />
      </figure>
      <div className="content">
        {article?.content.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
