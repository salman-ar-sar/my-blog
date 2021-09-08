import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { useCookies } from "react-cookie";
import "./Register.scss";
import sha256 from "../components/sha256";
import { User, UserForm } from "../types/types";

const Register = () => {
  const history = useHistory();
  const { darkMode } = useContext(ThemeContext);
  const [, setCookie] = useCookies(["user"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();

  const submitForm = handleSubmit(async ({ id, password, name }) => {
    let user = {} as User;

    user.id = id;
    user.passwordHash = await sha256(password);
    user.name = name;

    const response = await fetch(
      "https://my-json-server.typicode.com/salman-ar-sar/my-blog-data/users",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );

    if (response.ok) {
      setCookie("user", user.id, { path: "/" });
      history.push("/profile");
    } else {
      alert(response.status + " " + response.statusText);
    }
  });

  return (
    <div className="loginForm">
      <h2>Register</h2>
      <hr />
      <form onSubmit={submitForm}>
        <div className="inputClass">
          <label htmlFor="name" className="nameLabel">
            Name:{" "}
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            name="name"
          />
        </div>
        {errors.name && <div className="errorMsg">This field is required</div>}{" "}
        <div className="inputClass">
          <label htmlFor="id">Username: </label>
          <input
            {...register("id", { required: true })}
            type="text"
            name="id"
          />
        </div>
        {errors.id && <div className="errorMsg">This field is required</div>}{" "}
        <div className="inputClass">
          <label htmlFor="password" className="passLabel">
            Password:{" "}
          </label>
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

export default Register;
