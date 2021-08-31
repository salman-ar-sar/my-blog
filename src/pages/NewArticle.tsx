import "./NewArticle.scss";
import { useForm } from "react-hook-form";
import { Article } from "../types/article";
import { useContext, useState } from "react";
import { ThemeContext } from "../components/Contexts";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useCallback } from "react";

type State = {
  editArticle: number;
};

const NewArticle = () => {
  const { darkMode } = useContext(ThemeContext);
  const history = useHistory<State>();
  const [{ user }] = useCookies(["user"]);
  const [article, setArticle] = useState({} as Article);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const fetchArticle = useCallback(async () => {
    const id = history.location.state.editArticle;

    fetch(`http://localhost:8000/articles/${id}`)
      .then((res) => res.json())
      .then((article) => setArticle(article))
      .catch((error) => console.error(error));

    if (article) {
      setValue("title", article.title);
      article.content && setValue("contents", article.content.join("\n"));
    }
  }, [article, history.location.state.editArticle, setValue]);

  useEffect(() => {
    if (history.location.state) {
      fetchArticle();
    }
    return;
  }, [fetchArticle, history.location.state]);

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

    const response = await fetch("http://localhost:8000/articles", {
      method: "post",
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
          <button className={darkMode ? "dark" : ""}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewArticle;
