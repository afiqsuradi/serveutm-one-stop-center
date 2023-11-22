import { createContext, useContext, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ThemeContext = createContext({
  currentTheme: "light",
  changeCurrentTheme: (newTheme: string) => {
    console.info(newTheme);
    return;
  },
});

export default function ThemeProvider({ children }: Props) {
  const persistedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState<string>(persistedTheme || "dark");

  const changeCurrentTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add("[&_*]:!transition-none");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 1);

    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeProvider = () => useContext(ThemeContext);
