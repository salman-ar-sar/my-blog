import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../components/Contexts";

const Login = () => {
  const history = useHistory();
  const login = useContext(LoginContext);

  type FormData = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submitForm = handleSubmit((data) => {
    if (data.username === "admin" && data.password === "root") {
      //   alert("Correct");
      login.setUser(data.username);
      history.push("/profile");
    } else {
      alert("Wrong credentials!");
    }
  });

  return (
    <div>
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
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
