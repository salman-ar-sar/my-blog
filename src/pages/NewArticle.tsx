import "./NewArticle.scss";
import { useForm } from "react-hook-form";
import { Article } from "../types/article";
import { useContext } from "react";
import { ThemeContext } from "../components/Contexts";

const NewArticle = () => {
  const { darkMode } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Article>();

  const submitForm = handleSubmit((article) => {
    article.id = Math.ceil(Math.random() * 10);
    let spacelessString: string = article.title
      .toLowerCase()
      .trim()
      .replace(/\s/g, "-");
    article.title = spacelessString.replace(/[^a-z0-9-]/g, "");
    article.author = "Enid Blyton";
    console.log(article);
  });

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
          <label htmlFor="content">Content: </label>
          <textarea
            {...register("content", { required: true })}
            name="content"
            cols={30}
            rows={10}
          ></textarea>
        </div>
        {errors.content && (
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
