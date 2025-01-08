import { Link } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import FormsSearch from "./FormsSearch";
import { GlobalContext } from "../../context/GlobalProvider";
import logoimg from "../../images/logos/logo128.png";
import Languages from "../ui/Languages";

export default function Navbar() {
  const { currentUser, setCurrentUser, theme, toggleTheme, isAdmin, t, i18n } =
    useContext(GlobalContext);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authSession");
  };

  console.log(isAdmin);

  return (
    <header className="z-50 text-sm top-0 w-full fixed flex flex-row justify-around lg:justify-between bg-background dark:bg-background-dark h-14 items-center py-3 px-2 lg:px-4 lg:text-lg border-b border-solid border-gray-200 dark:border-gray-900">
      <div>
        <Link
          className="flex flex-row items-center gap-4 transition-all duration-300 hover:scale-105 hover:text-primary group"
          to=""
        >
          <img
            src={logoimg}
            alt=""
            className="h-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-2xl hidden lg:block transition-opacity duration-500 group-hover:opacity-100">
            {t("header.forms")}
          </span>
        </Link>
      </div>
      <FormsSearch t={t} />
      <div className="flex flex-row gap-1 lg:gap-4 items-center justify-between text-center">
        <button
          className="transition-colors duration-300 text-text dark:text-text-dark hover:text-gray-900 dark:hover:text-yellow-400"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon
            size="lg"
            icon={theme === "dark" ? faSun : faMoon}
            className="transition-transform duration-300 hover:scale-110"
          />
        </button>

        {currentUser && isAdmin && (
          <Link
            className="text-green-600 p-0 max-w-16 sm:max-w-fit"
            to="/admin"
            style={{ lineHeight: "20px" }}
          >
            {t("header.adminPage")}
          </Link>
        )}
        {!currentUser && (
          <Link
            className="text-blue-500 hover:underline"
            to="/auth?mode=signup"
          >
            {t("header.signUp")}
          </Link>
        )}
        {currentUser ? (
          <>
            <button
              className="hidden lg:block transition-colors duration-300 hover:text-red-500"
              onClick={logout}
            >
              {t("header.logOut")}
            </button>
            <FontAwesomeIcon
              className="text-red-500 p-2 sm:hidden transition-transform duration-300 hover:scale-110"
              icon={faRightFromBracket}
              size="lg"
            />
          </>
        ) : (
          <Link
            className="inline-block text-blue-500 hover:underline whitespace-nowrap"
            to="/auth?mode=login"
          >
            {t("header.logIn")}
          </Link>
        )}
        <Languages i18n={i18n} />
      </div>
    </header>
  );
}
