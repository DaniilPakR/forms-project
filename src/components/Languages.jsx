import { useEffect, useState, useCallback } from "react";

export default function Languages({ i18n }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    return savedLanguage;
  });

  useEffect(() => {
    const supportedLanguages = ["en", "ru"];
    if (supportedLanguages.includes(language)) {
      i18n.changeLanguage(language);
    } else {
      i18n.changeLanguage("en");
      setLanguage("en");
      localStorage.setItem("language", "en");
    }
  }, [i18n, language]);

  const changeLanguage = useCallback(
    (lang) => {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    },
    [setLanguage]
  );

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => changeLanguage("en")}
        className={`p-1 text-xs font-semibold border rounded-md ${
          language === "en"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300"
        } hover:bg-blue-100 dark:hover:bg-gray-700`}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ru")}
        className={`p-1 text-xs font-semibold border rounded-md ${
          language === "ru"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300"
        } hover:bg-blue-100 dark:hover:bg-gray-700`}
        aria-pressed={language === "ru"}
        aria-label="Switch to Russian"
      >
        РУ
      </button>
    </div>
  );
}
