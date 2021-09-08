import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { GoogleLogout } from "react-google-login";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ThemeContext } from "./Contexts";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [{ user }, setCookie] = useCookies(["user"]);
  const [{ googleUser }, setGCookie] = useCookies(["googleUser"]);
  const history = useHistory();
  let location = useLocation();

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setCookie("user", "", { path: "/" });
    history.push("/login");
  };

  const googleLogout = () => {
    setCookie("user", "", { path: "/" });
    setGCookie("googleUser", "", { path: "/" });
    history.push("/login");
  };

  return (
    <nav className={darkMode ? "dark" : "light"}>
      <ul>
        <Link className="logoLink" to="/">
          <li className="logo">My Blog</li>
        </Link>
        <img
          className="blogIcon"
          src="https://img.icons8.com/color/96/000000/google-blog-search.png"
          alt="an icon of a blog"
          onClick={() => history.push("/about")}
        />
        <div className="buttonContainer">
          {user ? (
            <>
              {location.pathname !== "/profile" && (
                <li className="profileButton">
                  <Link className="pageLink" to="/profile">
                    Profile
                  </Link>
                </li>
              )}
              {!googleUser ? (
                <a
                  className="pageLink"
                  onClick={(event) => logout(event)}
                  href="/"
                >
                  Logout
                </a>
              ) : (
                <GoogleLogout
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={googleLogout}
                ></GoogleLogout>
              )}
            </>
          ) : (
            location.pathname !== "/login" && (
              <li className="pageLink">
                <Link className="pageLink" to="/login">
                  Sign In
                </Link>
              </li>
            )
          )}
        </div>
        <li className="themeToggle">
          <label className="switch">
            <input
              type="checkbox"
              value={String(darkMode)}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
