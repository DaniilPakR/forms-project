import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import CreatedForms from "../components/CreatedForms";
import FilledForms from "../components/FilledForms";
import { GlobalContext } from "../context/GlobalProvider";

export default function HomePage() {
  const { currentUser, t } = useContext(GlobalContext);
  const navigate = useNavigate();

  function createForm() {
    const id = uuidv4();
    console.log(id);
    navigate(`/cform/${id}`);
  }

  console.log(currentUser)

  return (
    <div className="flex flex-col mt-16 bg-background dark:bg-background-dark">
      {!currentUser && <h1 className="mt-32 text-2xl text-center">{t("forms.homeNotLoggedIn")}</h1>}
      {currentUser && <CreatedForms createForm={createForm} />}
      {currentUser && <FilledForms />}
    </div>
  );
}
