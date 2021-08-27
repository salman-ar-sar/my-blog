import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./Contexts";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <nav className={darkMode ? "dark" : "light"}>
      <ul>
        <Link to="/">
          <li className="logo">My Blog</li>
        </Link>
        <img
          src="https://img.icons8.com/color/96/000000/google-blog-search.png"
          alt="an icon of a blog"
        />
        <li>
          <Link className="pageLink" to="/login">
            Sign In
          </Link>
        </li>
        <li>
          <Link className="pageLink" to="/about">
            About
          </Link>
        </li>
        <li style={{ marginRight: "2rem" }}>
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
