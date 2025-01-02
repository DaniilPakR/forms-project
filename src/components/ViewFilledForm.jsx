import { Link } from "react-router-dom";
import { useContext } from "react";

import ViewFormQuestions from "./ViewFormQuestions";
import { GlobalContext } from "../context/GlobalProvider";

export default function ViewFilledForm({ formData, answers, setAnswers, questions }) {
  const { t } = useContext(GlobalContext);

  console.log("Yo ", formData);

  return (
    <div
      style={{
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(30, 58, 138, 0.15)`,
      }}
      className="w-full max-w-4xl border bg-white dark:bg-gray-800 rounded-lg p-6 gap-6 flex flex-col"
    >
      <h1
        className={`text-center text-2xl lg:text-3xl font-semibold border-b border-border-dark pb-3`}
      >
        {formData.title}
      </h1>
      <p className="text-lg lg:text-xl text-text-muted">
        {formData.description}
      </p>
      <div>
        <ViewFormQuestions
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          onSetAnswers={setAnswers}
          read={true}
        />
      </div>
      <Link
        to={`/eform/${formData.page_id}`}
        className="mt-6 text-primary hover:text-primary-hover p-2 self-center"
      >
        {t("viewFilledForm.goBack")}
      </Link>
    </div>
  );
}
