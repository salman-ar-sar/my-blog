import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { useState } from "react";
import ArticlePage from "./pages/Article";
import Profile from "./pages/Profile";
import { ThemeContext } from "./components/Contexts";
import Login from "./pages/Login";
import NewArticle from "./pages/NewArticle";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={"container " + (darkMode ? "dark" : "light")}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/article/:id" component={ArticlePage} />
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/post">
              <NewArticle />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
