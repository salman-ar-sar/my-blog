import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { useCookies } from "react-cookie";
import "./Login.scss";

const Login = () => {
  const history = useHistory();
  const { darkMode } = useContext(ThemeContext);
  const [, setCookie] = useCookies(["user"]);

  type FormData = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submitForm = handleSubmit(({ username, password }) => {
    if (username === "admin" && password === "root") {
      //   alert("Correct");
      setCookie("user", username, { path: "/" });
      history.push("/profile");
    } else {
      alert("Wrong credentials!");
    }
  });

  return (
    <div className="loginForm">
      <h2>Login</h2>
      <hr />
      <form onSubmit={submitForm}>
        <div className="inputClass">
          <label htmlFor="username">Username: </label>
          <input
            {...register("username", { required: true })}
            type="text"
            name="username"
          />
        </div>
        {errors.username && (
          <div className="errorMsg">This field is required</div>
        )}{" "}
        <div className="inputClass">
          <label htmlFor="password">Password: </label>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
          />
        </div>
        {errors.password && (
          <div className="errorMsg">This field is required</div>
        )}{" "}
        <div className="inputClass">
          <button className={darkMode ? "dark" : ""}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
