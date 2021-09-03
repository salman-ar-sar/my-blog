import { match } from "react-router-dom";
import ArticleContainer from "../components/ArticleContainer";
import useFetch from "../components/useFetch";
import { Article, User } from "../types/types";

interface Params {
  name: string;
}

const ViewProfile = ({ match }: { match: match<Params> }) => {
  const name = match.params.name;

  const {
    data: user,
    isPending: isPending1,
    errorMsg: errorMsg1,
  } = useFetch<User>(`http://localhost:8000/users/${name}`);

  const {
    data: articles,
    isPending: isPending2,
    errorMsg: errorMsg2,
  } = useFetch<Article[]>(
    `http://localhost:8000/articles?author=${user?.name
      .trim()
      .replace(" ", "%20")}`
  );

  const isPending = isPending1 || isPending2;
  const errorMsg = errorMsg1 || errorMsg2;

  return (
    <div>
      <h1>{user?.name}</h1>
      {isPending && <div className="loadingMsg">Loading...</div>}
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
      {user && (
        <div className="articleContainer">
          {articles && <ArticleContainer articles={articles} />}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
