import { Link } from "react-router-dom";
import { useContext } from "react";

import FillFormQuestions from "./FillFormQuestions";
import { GlobalContext } from "../context/GlobalProvider";

export default function FillForm({
  formData,
  answers,
  setAnswers,
  onSetAnswers,
  onSubmit,
  form_id,
}) {
  const { t, currentUser } = useContext(GlobalContext);

  const isReadOnly = !currentUser;

  return (
    <div className="flex flex-col items-center mt-8">
      <div
        style={{
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(30, 58, 138, 0.15)`,
        }}
        className="w-full max-w-4xl border bg-white dark:bg-gray-800 rounded-lg p-6 gap-6 flex flex-col"
      >
        <h1
          className={`text-center text-2xl lg:text-3xl font-semibold border-b border-border-dark pb-3 ${
            formData.titleMarkdown.includes("bold") ? "font-bold" : ""
          } ${formData.titleMarkdown.includes("italic") ? "italic" : ""} ${
            formData.titleMarkdown.includes("underlined") ? "underline" : ""
          }`}
        >
          {formData.title}
        </h1>
        {formData.image_url && (
          <img
            alt=""
            src={`https://res.cloudinary.com/dmi1xxumf/image/upload/${form_id}`}
          />
        )}
        <p
          className={`text-lg lg:text-xl ${
            formData.descriptionMarkdown.includes("bold") ? "font-bold" : ""
          } ${
            formData.descriptionMarkdown.includes("italic") ? "italic" : ""
          } ${
            formData.descriptionMarkdown.includes("underlined")
              ? "underline"
              : ""
          }`}
        >
          {formData.description}
        </p>
        <div className="flex flex-col gap-4">
          {currentUser && (
            <div className="space-y-2">
              <label className="text-gray-500 font-normal">
                {t("fillForm.email")}
              </label>
              <input
                disabled
                type="text"
                value={currentUser.email}
                className="text-gray-500 w-full p-3 border rounded-md bg-background dark:bg-background-dark border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
          {currentUser && (
            <div className="space-y-2">
              <label className="text-gray-500 font-medium">
                {t("fillForm.date")}
              </label>
              <input
                disabled
                type="text"
                value={new Date().toLocaleDateString()}
                className="text-gray-500 w-full p-3 border rounded-md bg-background dark:bg-background-dark border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
          <FillFormQuestions
            questions={formData.questions}
            answers={answers}
            setAnswers={setAnswers}
            onSetAnswers={onSetAnswers}
            read={isReadOnly}
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
