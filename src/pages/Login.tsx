import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "../components/Contexts";
import { useCookies } from "react-cookie";
import "./Login.scss";
import sha256 from "../components/sha256";
import { fbResponse, User } from "../types/types";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { clientId, fbAppId, instaAppId } from "../config";
import SocialButton from "../components/SocialButton";

const Login = () => {
  const history = useHistory();
  const { darkMode } = useContext(ThemeContext);
  const [, setCookie] = useCookies(["user"]);
  const [, setSocialCookie] = useCookies(["socialUser"]);

  type FormData = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const setUserCookie = (username: string) => {
    setCookie("user", username, { path: "/" });
    history.push("/profile");
  };

  const submitForm = handleSubmit(async ({ username, password }) => {
    const response = await fetch(`http://localhost:8000/users/${username}`);
    if (response.ok) {
      const user: User = await response.json();
      // console.log(user);
      const hash = await sha256(password);
      if (hash === user.passwordHash) {
        setUserCookie(username);
      } else {
        alert("Wrong password!");
      }
    } else {
      alert("Wrong username or fetch error!");
    }
  });

  function isL(obj: any): obj is GoogleLoginResponse {
    return obj.profileObj !== undefined;
  }

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    console.log(response);
    if (isL(response)) {
      setSocialCookie("socialUser", "google", {
        path: "/",
      });
      setUserCookie(response.profileObj.givenName.toLowerCase());
    }
  };

  const responseFacebook = (response: fbResponse) => {
    setSocialCookie("socialUser", "fb", {
      path: "/",
    });
    setUserCookie(response._profile.firstName.toLowerCase());
  };

  const responseInsta = (response: fbResponse) => {
    // setSocialCookie("socialUser", "fb", {
    //   path: "/",
    // });
    // setUserCookie(response._profile.firstName.toLowerCase());
    console.log(response);
  };

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
          <button className={darkMode ? "dark" : ""}>Sign in</button>
        </div>
      </form>
      <div className="googleLogin">
        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <button
              className="gLoginButton"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img
                className="icon"
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="google"
                style={{ marginRight: "0.5rem" }}
              />
              Sign in with Google!
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <SocialButton
          className="gLoginButton"
          provider="facebook"
          appId={fbAppId}
          onLoginSuccess={responseFacebook}
          onLoginFailure={responseFacebook}
        >
          <img
            className="icon"
            src="https://image.flaticon.com/icons/png/512/747/747543.png"
            alt="facebook"
            style={{ marginRight: "0.6rem" }}
          />
          Sign in with Facebook!
        </SocialButton>
        <SocialButton
          className="gLoginButton"
          provider="instagram"
          appId={instaAppId}
          onLoginSuccess={responseInsta}
          onLoginFailure={responseInsta}
        >
          <img
            className="icon"
            src="https://img.icons8.com/fluency/50/000000/instagram-new.png"
            alt="insta"
            style={{ marginRight: "0.6rem" }}
          />
          Sign in with Instagram!
        </SocialButton>
      </div>
      <div className="centerDiv">
        Not registered? <Link to="/register">Click here to register</Link>.
      </div>
    </div>
  );
};

export default Login;
