import "./NewArticle.scss";
import { useForm } from "react-hook-form";
import { Article } from "../types/article";
import { useContext } from "react";
import { ThemeContext } from "../components/Contexts";
import { useHistory } from "react-router-dom";

type State = {
  prevPath: string;
};

const NewArticle = () => {
  const { darkMode } = useContext(ThemeContext);
  const history = useHistory<State>();

  type FormData = Article & {
    contents?: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submitForm = handleSubmit(async (article) => {
    console.log("in");

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

    // console.log(JSON.stringify(article));

    const response = await fetch("http://localhost:8000/articles", {
      method: "post",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    // const data = await response.json();

    if (response.ok) {
      history.push("/profile");
    } else {
      alert(response);
    }
  });

  if (
    history.location.state === undefined ||
    history.location.state.prevPath !== "/profile"
  ) {
    history.push("/profile");
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
