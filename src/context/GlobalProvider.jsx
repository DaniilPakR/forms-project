import { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const GlobalContext = createContext({

})

let externalContextReference = null

const URL = "https://forms-project-backend-p0dd.onrender.com";

// const URL = "http://localhost:5000"

export default function GlobalContextProvider({children}) {

  const [isReady, setIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("authSession")) || null);
  const [isAdmin, setIsAdmin] = useState(() => {
    const authSession = JSON.parse(localStorage.getItem("authSession"));
    return authSession ? authSession.is_admin : false;
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme || (prefersDark ? "dark" : "light");
  });
  const [languageInitialized, setLanguageInitialized] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLanguage = localStorage.getItem("language") || "en";
      await i18n.changeLanguage(savedLanguage);
      setLanguageInitialized(true);
    };
    initializeLanguage();
  }, [i18n]);

  

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    setIsReady(true);
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
    languageInitialized,
    isReady,
  }

  externalContextReference = ctxValue;

  return (
    <GlobalContext.Provider value={ctxValue}>
      {isReady ? children : ""}
    </GlobalContext.Provider>
  )
}

export { externalContextReference, GlobalContext }