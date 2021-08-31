import "./NewArticle.scss";
import { useForm } from "react-hook-form";
import { Article } from "../types/article";
import { useContext, useState } from "react";
import { ThemeContext } from "../components/Contexts";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

type State = {
  editArticle: number;
};

const NewArticle = () => {
  const { darkMode } = useContext(ThemeContext);
  const history = useHistory<State>();
  const [{ user }] = useCookies(["user"]);
  const [edit, setEdit] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const fetchPost = async () => {
    const id = history.location.state.editArticle;
    const response = await fetch(`http://localhost:8000/articles/${id}`);
    const articles = await response.json();
    return articles;
  };

  useEffect(() => {
    if (history.location.state) {
      fetchPost().then((article) => {
        setEdit(true);
        setValue("title", article.title);
        article.content && setValue("contents", article.content.join("\n"));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type FormData = Article & {
    contents?: string;
  };

  const submitForm = handleSubmit(async (article) => {
    article.id = Math.ceil(Math.random() * 10);

    let spacelessString: string = article.title
      .toLowerCase()
      .trim()
      .replace(/\s/g, "-");

    article.name = spacelessString.replace(/[^a-z0-9-]/g, "");
    article.author = "Enid Blyton";
    if (article.contents) {
      article.content = article.contents.split("\n");
    }
    delete article.contents;

    let url: string;
    let method: string;

    if (edit) {
      const id = history.location.state.editArticle;
      url = `http://localhost:8000/articles/${id}`;
      method = "PUT";
    } else {
      url = "http://localhost:8000/articles";
      method = "POST";
    }

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      history.push("/profile");
    } else {
      alert(response);
    }
  });

  if (!user) {
    alert("Login before posting!");
    history.push("/login");
  }

  return (
    <div className="newPost">
      <h2>Create a new post:</h2>
      <form onSubmit={submitForm}>
        <div className="inputClass">
          <label htmlFor="title">Title: </label>
          <input
            className="titleInput"
            {...register("title", { required: true })}
            type="text"
            name="title"
          />
        </div>
        {errors.title && <div className="errorMsg">This field is required</div>}{" "}
        <div className="inputClass">
          <label htmlFor="contents">Content: </label>
          <textarea
            className={darkMode ? "dark" : ""}
            {...register("contents", { required: true })}
            name="contents"
            cols={30}
            rows={10}
          ></textarea>
        </div>
        {errors.contents && (
          <div className="errorMsg">This field is required</div>
        )}{" "}
        <div className="inputClass">
          <label htmlFor="image">Image URL: </label>
          <input
            className="imageInput"
            {...register("image", { required: true })}
            type="text"
            name="image"
          />
        </div>
        {errors.image && <div className="errorMsg">This field is required</div>}{" "}
        <div className="inputClass">
          <button className={darkMode ? "dark" : ""}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewArticle;
