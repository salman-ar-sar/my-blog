import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <nav className={darkMode ? "dark" : "light"}>
      <ul>
        <li className="logo">Our Blog</li>
        <img
          src="https://img.icons8.com/color/96/000000/google-blog-search.png"
          alt="an icon of a blog"
        />
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
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
