import { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const GlobalContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  theme: "",
  toggleTheme: () => {},
  t: (key) => key,
  i18n: null,
  URL: "",
  languageInitialized: false,
  isReady: false,
});

let externalContextReference = null;

// const URL = "https://forms-project-backend-p0dd.onrender.com";

const URL = "http://localhost:5000";

export default function GlobalContextProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("authSession")) || null
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || false
  );
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
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

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      async function fetchLatestUserData() {
        try {
          const response = await fetch(
            `${URL}/get-user-info/${currentUser.id}`
          );
          if (!response.ok) {
            console.error("Failed to fetch user info");
          }
          const data = await response.json();
          setIsAdmin(data.is_admin);
          localStorage.setItem("isAdmin", data.is_admin);
          if (data.is_blocked) {
            setCurrentUser(null);
            setIsAdmin(false);
            localStorage.removeItem("authSession");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("isBlocked");
          }
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchLatestUserData();
    }
  }, [currentUser]);

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
  };

  externalContextReference = ctxValue;

  return (
    <GlobalContext.Provider value={ctxValue}>
      {isReady ? children : ""}
    </GlobalContext.Provider>
  );
}

export { externalContextReference, GlobalContext };
