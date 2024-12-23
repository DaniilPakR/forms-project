import { useEffect } from "react";

export default function Languages({i18n}) {

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => changeLanguage("en")}
        className={`p-1 text-xs font-semibold border rounded-md ${
          i18n.language === "en"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300"
        } hover:bg-blue-100 dark:hover:bg-gray-700`}
        aria-pressed={i18n.language === "en"}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ru")}
        className={`p-1 text-xs font-semibold border rounded-md ${
          i18n.language === "ru"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300"
        } hover:bg-blue-100 dark:hover:bg-gray-700`}
        aria-pressed={i18n.language === "ru"}
      >
        RU
      </button>
    </div>
  );
}
