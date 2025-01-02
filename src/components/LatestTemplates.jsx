import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";

export default function LatestTemplates() {
  const { URL, t } = useContext(GlobalContext);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchLatestForms() {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL}/latest/forms`);
        if (!response.ok) {
          throw new Error("Failed to fetch latest forms");
        }

        const data = await response.json();
        setResults(data.forms);
      } catch (err) {
        console.error("Error fetching latest forms:", err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLatestForms();
  }, [URL]);

  return (
    <div className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-text dark:text-text-dark mb-4">
        {t("latestTemplates.latestTemplates")}
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-primary dark:text-primary-dark animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-background-accent dark:bg-background-dark-accent p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <h3 className="text-lg font-medium text-text dark:text-text-dark mb-2">
                {result.title}
              </h3>
              <Link
                to={`/fform/${result.page_id}`}
                className="text-primary dark:text-primary-light font-medium hover:underline"
              >
                {t("latestTemplates.fillForm")}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted dark:text-dark-muted">
          {t("latestTemplates.noTemplatesFound")}
        </div>
      )}
    </div>
  );
}
