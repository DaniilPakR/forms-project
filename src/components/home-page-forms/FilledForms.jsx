import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../../context/GlobalProvider";
import { toast } from "react-toastify";

export default function FilledForms() {
  const { currentUser, t, URL } = useContext(GlobalContext);
  const [filledForms, setFilledForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilledForms() {
      try {
        if (!currentUser?.id) return;

        const response = await fetch(
          `${URL}/filled-forms/${currentUser.id}`
        );
        if (!response.ok) {
          return;
        }

        const result = await response.json();
        setFilledForms(result.filledForms || []);
        console.log(result);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFilledForms();
  }, [currentUser?.id, URL]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }
  
  if (!currentUser) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <h1 className="text-2xl font-bold mb-4">{t("forms.filledForms")}</h1>
      {filledForms.length === 0 ? (
        <p className="text-center text-muted dark:text-dark-muted">
          {t("forms.noFilledForms")}
        </p>
      ) : (
        <ul className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filledForms.map((form) => (
            <li
              key={form.page_id}
              className="border rounded-lg p-4 bg-background-accent dark:bg-background-dark-accent shadow hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{form.title}</h2>
                <p className="text-sm text-muted dark:text-dark-muted">
                  {t("forms.submittedOn")}: {new Date(form.filled_at).toLocaleString()}
                </p>
              </div>
              <Link
                to={`/vform/${form.filled_form_id}?mode=non`}
                className="block mt-4 bg-primary text-button-text text-center py-2 px-4 rounded hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary"
              >
                {t("forms.viewForm")}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
