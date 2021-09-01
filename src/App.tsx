import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { useState } from "react";
import ArticlePage from "./pages/Article";
import Profile from "./pages/Profile";
import { ThemeContext } from "./components/Contexts";
import Login from "./pages/Login";
import NewArticle from "./pages/NewArticle";
import PageNotFound from "./pages/PageNotFound";
import { useCookies } from "react-cookie";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [{ user }] = useCookies<"user", { user: string }>(["user"]);

  const PrivateRoute = ({ children, ...rest }: RouteProps): JSX.Element => {
    return (
      <Route
        {...rest}
        render={() => (user ? children : <Redirect to="/login" />)}
      />
    );
  };

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
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <Route path="/post">
              <NewArticle />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
