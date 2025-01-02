import { Link } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

import FormsSearch from "./FormsSearch";
import { GlobalContext } from "../context/GlobalProvider";
import logoimg from "../images/logos/logo128.png";
import Languages from "./Languages";

export default function Navbar() {
  const { currentUser, setCurrentUser, theme, toggleTheme, isAdmin, t, i18n } =
    useContext(GlobalContext);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authSession");
  };

  console.log(isAdmin)

  return (
    <header className="z-50 text-sm top-0 w-full fixed flex flex-row justify-around lg:justify-between bg-background dark:bg-background-dark h-14 items-center py-3 px-2 lg:px-4 lg:text-lg border-b border-solid border-gray-300 dark:border-gray-700">
      <div>
        <Link className="flex flex-row items-center gap-4" to="">
          <img src={logoimg} alt="" className="h-10" />
          <span className="text-2xl hidden lg:block">{t("header.forms")}</span>
        </Link>
      </div>
      <FormsSearch t={t} />
      <div className="flex flex-row gap-2 lg:gap-4 items-center">
        <button className="text-text dark:text-text-dark" onClick={toggleTheme}>
          <FontAwesomeIcon size="lg" icon={theme === "dark" ? faSun : faMoon} />
        </button>
        {currentUser && isAdmin && (
          <Link
            className="text-green-600 hover:underline"
            to="/admin"
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
          <button onClick={logout}>{t("header.logOut")}</button>
        ) : (
          <Link className="text-blue-500 hover:underline" to="/auth?mode=login">
            {t("header.logIn")}
          </Link>
        )}
        <Languages i18n={i18n} />
      </div>
    </header>
  );
}
