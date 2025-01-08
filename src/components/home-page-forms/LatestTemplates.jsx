import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";

import darkFormImg from "../../images/forms/dark-form.png";
import lightFormImg from "../../images/forms/light-form.png";

export default function LatestTemplates() {
  const { URL, t } = useContext(GlobalContext);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLatestForms() {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL}/latest/forms`);
        if (!response.ok) {
          throw new Error("Failed to fetch latest forms");
        }

        const data = await response.json();
        console.log(data);

        const formsWithScreenshots = await Promise.all(
          data.forms.map(async (form) => {
            console.log("TEST", form);
            try {
              const screenshotResponse = await fetch(
                `https://api.screenshotone.com/take?access_key=qDi0nWJbeiIECQ&url=${encodeURIComponent(
                  `https://forms-project-c77c1.web.app/fform/${form.page_id}`
                )}&wait_for=5000`,
                {
                  method: "GET",
                }
              );
              if (!screenshotResponse.ok) {
                throw new Error(`Screenshot API failed for form ${form.title}`);
              }
              const screenshotData = await screenshotResponse.json();
              return { ...form, screenshotUrl: screenshotData.url };
            } catch (error) {
              console.error(
                `Error fetching screenshot for form ${form.title}:`,
                error.message
              );
              return { ...form, screenshotUrl: null };
            }
          })
        );

        setResults(formsWithScreenshots);
      } catch (err) {
        console.error("Error fetching latest forms:", err.message);
        setError("Unable to load latest templates. Please try again later.");
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
      ) : error ? (
        <div className="text-error dark:text-error-dark text-center font-medium">
          {error}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-background-accent dark:bg-background-dark-accent p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 group"
            >
              {result.screenshotUrl && (
                <img
                  src={result.screenshotUrl}
                  alt={`${result.title} preview`}
                  className="w-full h-32 object-cover rounded-md mb-2 transform transition-transform duration-200 group-hover:scale-105"
                />
              )}

              <h3 className="text-lg font-medium text-text dark:text-text-dark mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
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
        <div className="text-muted dark:text-dark-muted text-center">
          {t("latestTemplates.noTemplatesFound")}
        </div>
      )}
    </div>
  );
}
