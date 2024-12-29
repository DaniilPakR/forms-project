import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

import { GlobalContext } from "../context/GlobalProvider";
import formimg from "../images/logos/logo64.png";
import { deleteForm } from "../utils/deleteForm";

export default function CreatedForms({ createForm }) {
  const { currentUser, t, URL } = useContext(GlobalContext);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchForms = async () => {
      try {
        const response = await fetch(
          `${URL}/forms/user/${currentUser.id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch forms.");
        }

        setForms(data.forms);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [currentUser?.id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-text dark:text-text-dark">Loading...</p>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center py-8 bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-primary-light">
        {t("forms.myForms")}
      </h1>
      <button
        className="ml-4 self-start rounded-md bg-green-200 dark:bg-green-700 p-2"
        onClick={createForm}
      >
        {t("forms.newForm")}
      </button>

      {forms.length === 0 ? (
        <p className="text-lg text-muted dark:text-dark-muted">
          {t("forms.noForms")}
        </p>
      ) : (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {forms.map((form) => (
            <li
              key={form.form_id}
              className="flex flex-col bg-background-accent dark:bg-background-dark-accent border border-border-light dark:border-border-dark rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
            >
              <Link to={`/eform/${form.page_id}`} className="flex-grow">
                <div>
                  <h2 className="text-xl font-bold text-primary dark:text-primary-light mb-2">
                    {form.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted dark:text-dark-muted">
                    <img src={formimg} alt="Form logo" className="h-5" />
                    <span>
                      {t("forms.createdAt")}:{" "}
                      {new Date(form.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="mt-4 flex justify-end">
                <IconButton
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteForm(form.form_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
