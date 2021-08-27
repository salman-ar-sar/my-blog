import { createContext } from "react";

export const LoginContext = createContext(
  {} as { user: string; setUser: React.Dispatch<React.SetStateAction<string>> }
);

export const ThemeContext = createContext(
  {} as {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  }
);
