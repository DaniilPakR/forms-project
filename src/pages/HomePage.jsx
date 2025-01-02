import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import CreatedForms from "../components/CreatedForms";
import FilledForms from "../components/FilledForms";
import { GlobalContext } from "../context/GlobalProvider";
import LatestTemplates from "../components/LatestTemplates";
import PopularForms from "../components/PopularForms";
import TagCloud from "../components/TagCloud";

export default function HomePage() {
  const { currentUser, t, URL } = useContext(GlobalContext);
  const navigate = useNavigate();

  function createForm() {
    const id = uuidv4();
    console.log(id);
    navigate(`/cform/${id}`);
  };

  useEffect(() => {
    async function fetchTables() {
      try {
        const response = await fetch("http://localhost:5000/tables");
        if (!response.ok) {
          throw new Error("Failed to fetch form");
        }

        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error("Error fetching form:", err.message);
      }
    }

    fetchTables();
  }, []);
  
  console.log(currentUser)

  return (
    <div className="flex flex-col mt-16 bg-background dark:bg-background-dark">
      {!currentUser && <h1 className="mt-32 text-2xl text-center">{t("forms.homeNotLoggedIn")}</h1>}
      <TagCloud />
      <LatestTemplates />
      <PopularForms />
      {currentUser && <CreatedForms createForm={createForm} />}
      {currentUser && <FilledForms />}
    </div>
  );
}
