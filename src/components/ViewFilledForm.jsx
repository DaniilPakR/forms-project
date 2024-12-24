import { Link } from "react-router-dom";

import ViewFormQuestions from "./ViewFormQuestions";

export default function ViewFilledForm({ formData, answers, setAnswers }) {

  console.log("Yo ", formData)

  return (
    <div className="flex flex-col w-4/5 lg:w-1/2 bg-background dark:bg-background-dark text-text dark:text-text-dark border border-border-dark shadow-md rounded-md p-6 space-y-5">
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
          questions={formData.questions}
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
        Go back
      </Link>
    </div>
  );
}
