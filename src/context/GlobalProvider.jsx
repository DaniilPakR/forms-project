import { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const GlobalContext = createContext({

})

let externalContextReference = null

const URL = "https://forms-project-backend-p0dd.onrender.com";

export default function GlobalContextProvider({children}) {

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("authSession")) || null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme || (prefersDark ? "dark" : "light");
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };


  const ctxValue = {
    isLogged,
    setIsLogged,
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
    theme,
    toggleTheme,
    t,
    i18n,
    URL,
  }

  externalContextReference = ctxValue;

  return (
    <GlobalContext.Provider value={ctxValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export { externalContextReference, GlobalContext }