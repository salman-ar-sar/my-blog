import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { useCookies } from "react-cookie";
import "./Login.scss";
import sha256 from "../components/sha256";
import { User } from "../types/types";

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

  const submitForm = handleSubmit(async ({ username, password }) => {
    const response = await fetch(`http://localhost:8000/users/${username}`);
    if (response.ok) {
      const user: User = await response.json();
      // console.log(user);
      const hash = await sha256(password);
      if (hash === user.passwordHash) {
        setCookie("user", username, { path: "/" });
        history.push("/profile");
      } else {
        alert("Wrong password!");
      }
    } else {
      alert("Wrong username or fetch error!");
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

      <div className="centerDiv">
        Not registered? <Link to="/register">Click here to register</Link>.
      </div>
    </div>
  );
};

export default Login;
