import { createContext } from "react";

export const ThemeContext = createContext(
  {} as {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  }
);
