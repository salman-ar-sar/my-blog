import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { useState } from "react";
import ArticlePage from "./pages/Article";
import Profile from "./pages/Profile";
import { LoginContext, ThemeContext } from "./components/Contexts";
import Login from "./pages/Login";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState("");

  return (
    <LoginContext.Provider value={{ user, setUser }}>
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
            </Switch>
          </Router>
        </div>
      </ThemeContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
