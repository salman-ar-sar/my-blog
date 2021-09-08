import { match } from "react-router-dom";
import ArticleContainer from "../components/ArticleContainer";
import useFetch from "../components/useFetch";
import { Article } from "../types/types";

interface Params {
  name: string;
}

const ViewProfile = ({ match }: { match: match<Params> }) => {
  const name = match.params.name;

  const {
    data: articles,
    isPending,
    errorMsg,
  } = useFetch<Article[]>(
    `https://my-json-server.typicode.com/salman-ar-sar/my-blog-data/articles?author=${name}`
  );

  return (
    <div>
      <h1>{name}</h1>
      {isPending && <div className="loadingMsg">Loading...</div>}
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
      {name && articles && <ArticleContainer articles={articles} />}
    </div>
  );
};

export default ViewProfile;
