import { Link } from "react-router-dom";
import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalProvider";

export default function ViewFilledForms({ responses }) {
  const { t } = useContext(GlobalContext);

  console.log(responses);

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-semibold">
        {t("viewFilledForm.readForms")}:
      </h1>
      {responses.filledForms.map((filledForm) => (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <h3 className="font-medium text-lg sm:text-base text-gray-800 dark:text-gray-200">
              {filledForm.user_name}, {filledForm.user_email}
            </h3>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {t("viewFilledForm.dateSubmitted")}:{" "}
              {new Date(filledForm.filled_at).toLocaleDateString()}
            </h3>
            <h3>
              Score: {responses.form.form_type === "quiz" ? filledForm.score : ""}
            </h3>
          </div>

          <Link
            to={`/vform/${filledForm.filled_form_id}`}
            className="mt-2 sm:mt-0 bg-primary text-button-text text-center py-2 px-4 rounded-md hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary text-sm sm:text-base"
          >
            {t("viewFilledForm.viewInReadMode")}
          </Link>
        </div>
      ))}
    </div>
  );
}
