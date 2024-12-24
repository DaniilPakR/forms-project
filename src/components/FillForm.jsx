import { Link } from "react-router-dom";

import FillFormQuestions from "./FillFormQuestions";

export default function FillForm({
  formData,
  answers,
  setAnswers,
  onSetAnswers,
  currentUser,
  onSubmit
}) {

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-4/5 lg:w-1/2 bg-background dark:bg-background-dark text-text dark:text-text-dark border border-border-dark shadow-md rounded-md p-6 space-y-5">
        <h1 className={`text-center text-2xl lg:text-3xl font-semibold border-b border-border-dark pb-3`}>
          {formData.title}
        </h1>
        <p className="text-lg lg:text-xl text-text-muted">{formData.description}</p>
        <div>
          <FillFormQuestions
            questions={formData.questions}
            answers={answers}
            setAnswers={setAnswers}
            onSetAnswers={onSetAnswers}
            currentUser={currentUser}
            read={false}
          />
        </div>
      </div>
      {currentUser.is_admin && (
        <Link to={`/eform/${formData.page_id}`} className="mt-6 text-primary hover:text-primary-hover">
          Edit Form
        </Link>
      )}
      {currentUser && (
        <button
          className="mt-6 bg-primary hover:bg-primary-hover text-button-text font-medium rounded-md w-3/4 lg:w-1/3 py-3"
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
      )}
    </div>
  );
}
