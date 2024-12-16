export default function FillFormQuestions({ questions, answers, onSetAnswers }) {
  if (!questions || questions.length === 0) {
    return <p>No questions available</p>;
  }

  return (
    <div className="space-y-6">
      {questions.map((question) => {
        switch (question.question_type) {
          case "short-answer":
            return (
              <div key={question.question_id}>
                <label htmlFor={`question-${question.question_id}`} className="block mb-2">
                  {question.question_text}
                </label>
                <input
                  type="text"
                  id={`question-${question.question_id}`}
                  required={question.is_required}
                  value={answers[question.question_id]?.value || ""}
                  onChange={(e) => onSetAnswers(question.question_id, "short-answer", e.target.value)}
                  placeholder="Your Answer"
                  className="input-class"
                />
              </div>
            );

          case "paragraph":
            return (
              <div key={question.question_id}>
                <label htmlFor={`question-${question.question_id}`} className="block mb-2">
                  {question.question_text}
                </label>
                <textarea
                  id={`question-${question.question_id}`}
                  required={question.is_required}
                  value={answers[question.question_id]?.value || ""}
                  onChange={(e) => onSetAnswers(question.question_id, "paragraph", e.target.value)}
                  placeholder="Your Answer"
                  className="textarea-class"
                />
              </div>
            );

          case "multiple-choice":
            return (
              <div key={question.question_id}>
                <p className="mb-2">{question.question_text}</p>
                {question.options.map((option) => (
                  <label key={option.option_id} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question.question_id}`}
                      value={option.option_text}
                      checked={answers[question.question_id]?.value === option.option_text}
                      onChange={(e) =>
                        onSetAnswers(question.question_id, "multiple-choice", e.target.value)
                      }
                      className="mr-2"
                    />
                    {option.option_text}
                  </label>
                ))}
              </div>
            );

          case "checkboxes":
            return (
              <div key={question.question_id}>
                <p className="mb-2">{question.question_text}</p>
                {question.options.map((option) => (
                  <label key={option.option_id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option.option_text}
                      checked={(answers[question.question_id]?.value || []).includes(option.option_text)}
                      onChange={(e) =>
                        onSetAnswers(question.question_id, "checkboxes", e.target.value, true)
                      }
                      className="mr-2"
                    />
                    {option.option_text}
                  </label>
                ))}
              </div>
            );

          case "dropdown":
            return (
              <div key={question.question_id}>
                <label htmlFor={`dropdown-${question.question_id}`} className="block mb-2">
                  {question.question_text}
                </label>
                <select
                  id={`dropdown-${question.question_id}`}
                  required={question.is_required}
                  value={answers[question.question_id]?.value || ""}
                  onChange={(e) => onSetAnswers(question.question_id, "dropdown", e.target.value)}
                  className="select-class"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {question.options.map((option) => (
                    <option key={option.option_id} value={option.option_text}>
                      {option.option_text}
                    </option>
                  ))}
                </select>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
