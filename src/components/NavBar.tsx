import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li className="logo">Our Blog</li>
        <img
          src="https://img.icons8.com/color/48/000000/google-blog-search.png"
          alt="an icon of a blog"
        />
        <li>
          <Link to="/">Home</Link>
        </li>
        <li style={{ marginRight: "2rem" }}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
