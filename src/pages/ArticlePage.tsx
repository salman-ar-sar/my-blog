import { Link, match } from "react-router-dom";
import useFetch from "../components/useFetch";
import { Article } from "../types/types";
import "./ArticlePage.scss";

interface Params {
  id: string;
}

const ArticlePage = ({ match }: { match: match<Params> }) => {
  const id = match.params.id;

  const {
    data: article,
    isPending,
    errorMsg,
  } = useFetch<Article>(
    `https://my-json-server.typicode.com/salman-ar-sar/my-blog-data/articles/${id}`
  );

  return (
    <div className="articlePage">
      {isPending && <div className="loadingMsg">Loading...</div>}
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
      <h2>{article?.title}</h2>
      <Link className="authorName" to={`/user/${article?.author}`}>
        <h4>{article?.author}</h4>
      </Link>
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
        {article?.content instanceof Array ? (
          article?.content.map((content, index) => <p key={index}>{content}</p>)
        ) : (
          <p>{article?.content}</p>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
