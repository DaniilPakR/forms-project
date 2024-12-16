import FillFormQuestions from "./FillFormQuestions";

export default function FillForm({ formData, answers, setAnswers, onSetAnswers }) {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-4/5 lg:w-1/2 border border-solid bg-background dark:bg-background-dark text-text dark:text-text-dark rounded-md border-black py-4 px-5 gap-3 flex flex-col">
        <h1 className="text-center text-2xl lg:text-3xl border-b border-black pb-2">
          {formData.title}
        </h1>
        <h1 className="text-lg lg:text-xl">{formData.description}</h1>
        <div className="flex flex-row justify-between items-center">
          <FillFormQuestions
            questions={formData.questions}
            answers={answers}
            setAnswers={setAnswers}
            onSetAnswers={onSetAnswers}
          />
        </div>
      </div>
    </div>
  );
}
