import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { createContext, useState } from "react";

export const ThemeContext = createContext(
  {} as {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const className = "container " + (darkMode ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={className}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
