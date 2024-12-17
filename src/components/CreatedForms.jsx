import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../context/GlobalProvider";
import formimg from "../images/logos/logo64.png";

export default function CreatedForms() {
  const { currentUser } = useContext(GlobalContext);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchForms = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/forms/user/${currentUser.id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch forms.");
        }

        setForms(data.forms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [currentUser?.id]);

  if (!currentUser) {return}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="w-full flex flex-col items-center bg-background dark:bg-background-dark text-text dark:text-text-dark">
        <h1>My Forms:</h1>
        {forms.length === 0 ? (
          <p>No forms created yet.</p>
        ) : (
          <ul className="w-full p-4 flex flex-col lg:flex-row gap-4">
            {forms.map((form) => (
              <li
                key={form.form_id}
                className="flex flex-col border p-4 mb-4 rounded lg:w-1/4 h-48"
              >
                <Link to={`/eform/${form.page_id}`}>
                  <div></div>
                  <div>
                    <h2 className="text-xl font-bold">{form.title}</h2>
                    <div className="flex flex-row items-center gap-2 justify-self-end">
                      <img src={formimg} alt="" className="h-5" />
                      <small>
                        Created at: {new Date(form.created_at).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
