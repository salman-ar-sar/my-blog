import { Link, useHistory, useLocation } from "react-router-dom";
import { Article } from "../types/types";
import "./ArticleContainer.scss";
import Modal from "react-modal";
import { useState } from "react";

interface Props {
  articles: Article[];
}

Modal.setAppElement("#root");

const ArticleContainer = ({ articles }: Props) => {
  let location = useLocation();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(0);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const confirmDelete = async () => {
    const response = await fetch(`http://localhost:8000/articles/${deleteID}`, {
      method: "DELETE",
    });

    if (response.ok) {
      history.go(0);
    } else {
      alert(response);
    }
  };

  const deleteArticle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    setDeleteID(id);
    setModalOpen(true);
  };

  const editArticle = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();
    history.push("/post", { editArticle: id });
  };

  return (
    <>
      <div className="articleContainer">
        {articles?.map((article) => {
          return (
            <Link to={"/article/" + article.id} key={article.id}>
              <div className="article" key={article.id}>
                <p className="title">{article.title}</p>
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
                    <button
                      onClick={(event) => deleteArticle(event, article.id)}
                    >
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
            </Link>
          );
        })}
      </div>
      <Modal isOpen={modalOpen} style={customStyles}>
        <p>Are you sure you want to delete this article?</p>
        <div className="buttons">
          <button className="confirmButton" onClick={() => confirmDelete()}>
            Confirm
          </button>
          <button className="cancelButton" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ArticleContainer;
