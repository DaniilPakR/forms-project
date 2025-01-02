import { Link } from "react-router-dom";
import { useContext } from "react";

import FillFormQuestions from "./FillFormQuestions";
import { GlobalContext } from "../context/GlobalProvider";

export default function FillForm({
  formData,
  answers,
  setAnswers,
  onSetAnswers,
  currentUser,
  onSubmit,
  form_id,
}) {

  const { t } = useContext(GlobalContext);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-4/5 lg:w-1/2 bg-background dark:bg-background-dark text-text dark:text-text-dark border border-border-dark shadow-md rounded-md p-6 space-y-5">
        <h1
          className={`text-center text-2xl lg:text-3xl font-semibold border-b border-border-dark pb-3`}
        >
          {formData.title}
        </h1>
        {formData.image_url && (<img alt="" src={`https://res.cloudinary.com/dmi1xxumf/image/upload/${form_id}`} />)}
        <p className="text-lg lg:text-xl text-text-muted">
          {formData.description}
        </p>
        <div className="flex flex-col gap-4">
          {currentUser && <div className="space-y-2">
            <label
              className="text-gray-500 font-normal"
            >
              {t("fillForm.email")}
            </label>
            <input
              disabled
              type="text"
              value={currentUser.email}
              className="text-gray-500 w-full p-3 border rounded-md bg-background dark:bg-background-dark border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>}
          {currentUser && <div className="space-y-2">
            <label
              className="text-gray-500 font-medium"
            >
              {t("fillForm.date")}
            </label>
            <input
              disabled
              type="text"
              value={new Date().toLocaleDateString()}
              className="text-gray-500 w-full p-3 border rounded-md bg-background dark:bg-background-dark border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>}
          <FillFormQuestions
            questions={formData.questions}
            answers={answers}
            setAnswers={setAnswers}
            onSetAnswers={onSetAnswers}
            currentUser={currentUser}
            read={false}
            t={t}
          />
        </div>
      </div>
      {currentUser.is_admin && (
        <Link
          to={`/eform/${formData.page_id}`}
          className="mt-6 text-primary hover:text-primary-hover"
        >
          {t("fillForm.editForm")}
        </Link>
      )}
      {currentUser && (
        <button
          className="mt-6 bg-primary hover:bg-primary-hover text-button-text font-medium rounded-md w-3/4 lg:w-1/3 py-3"
          onClick={(e) => onSubmit(e)}
        >
          {t("fillForm.submit")}
        </button>
      )}
    </div>
  );
}
