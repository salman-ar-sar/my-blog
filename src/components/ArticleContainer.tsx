import { Link, useHistory, useLocation } from "react-router-dom";
import { Article } from "../types/article";
import "./ArticleContainer.scss";

interface Props {
  articles: Article[];
}

const ArticleContainer = ({ articles }: Props) => {
  let location = useLocation();
  const history = useHistory();

  const deleteArticle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8000/articles/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      history.go(0);
    } else {
      alert(response);
    }
  };

  const editArticle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    history.push("/post", { editArticle: id });
  };

  return (
    <div className="articleContainer">
      {articles?.map((article) => {
        return (
          <div className="article" key={article.id}>
            <Link to={"/article/" + article.id}>
              <p className="title">{article.title}</p>
            </Link>
            <img
              src={
                article.image
                  ? article.image
                  : `https://picsum.photos/300/200?random=${article.id}`
              }
              alt="article"
            />
            {location.pathname === "/profile" && (
              <div className="buttonContainer">
                <button onClick={(event) => deleteArticle(event, article.id)}>
                  <img
                    src="https://image.flaticon.com/icons/png/512/1632/1632602.png"
                    alt="delete"
                  />
                </button>
                <button onClick={(event) => editArticle(event, article.id)}>
                  <img
                    src="https://image.flaticon.com/icons/png/512/2921/2921222.png"
                    alt="edit"
                  />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArticleContainer;
