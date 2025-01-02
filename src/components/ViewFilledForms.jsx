import { Link } from "react-router-dom";
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";

export default function ViewFilledForms({ responses }) {

  const { t } = useContext(GlobalContext);

  return (
    <div className="flex flex-col">
      <h1>{t("viewFilledForm.readForms")}:</h1>
      {responses.filledForms.map((filledForm) => (
        <div className="flex flex-row justify-between items-center mb-1">
          <h3>
            {filledForm.user_name}, {filledForm.user_email}
          </h3>
          <h3>
          {t("viewFilledForm.dateSubmitted")}:
            {new Date(filledForm.filled_at).toLocaleDateString()}
          </h3>
          <Link to={`/vform/${responses.form.page_id}`} className="bg-primary text-button-text text-center py-1 px-2 rounded hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary">
          {t("viewFilledForm.viewInReadMode")}
          </Link>
        </div>
      ))}
    </div>
  );
}
