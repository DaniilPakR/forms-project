export default function ViewFormQuestions({
  questions,
  answers,
  onSetAnswers,
  currentUser
}) {
  if (!questions || questions.length === 0) {
    return <p className="text-center text-text-muted">No questions available</p>;
  }

  console.log("Hi ", answers)

  console.log("QUESTIONS ", questions)
  return (
    <div className="space-y-6">
      {questions.map((question) => {
        switch (question.question_type) {
          case "short-answer":
            return (
              <div key={question.question_id} className="space-y-2">
                <label htmlFor={`question-${question.question_id}`} className="font-medium">
                  {question.question_text}
                </label>
                <input
                  disabled
                  type="text"
                  id={`question-${question.question_id}`}
                  required={question.is_required}
                  value={answers[question.question_id]?.answer_text || ""}
                  onChange={(e) =>
                    onSetAnswers(question.question_id, "short-answer", e.target.value)
                  }
                  placeholder="Your Answer"
                  className="w-full p-3 border rounded-md bg-background dark:bg-background-dark text-text dark:text-text-dark border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            );

          case "paragraph":
            return (
              <div key={question.question_id} className="space-y-2">
                <label htmlFor={`question-${question.question_id}`} className="font-medium">
                  {question.question_text}
                </label>
                <textarea
                  disabled
                  id={`question-${question.question_id}`}
                  required={question.is_required}
                  value={answers[question.question_id]?.answer_text || ""}
                  onChange={(e) =>
                    onSetAnswers(question.question_id, "paragraph", e.target.value)
                  }
                  placeholder="Your Answer"
                  className="w-full p-3 border rounded-md bg-background dark:bg-background-dark text-text dark:text-text-dark border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            );

          case "multiple-choice":
            return (
              <div key={question.question_id} className="space-y-2">
                <p className="font-medium">{question.question_text}</p>
                <div className="space-y-1">
                  {question.options.map((option) => (
                    <label key={option.option_id} className="flex items-center space-x-2">
                      <input
                        disabled
                        type="radio"
                        name={`question-${question.question_id}`}
                        value={option.option_text}
                        checked={answers[question.question_id]?.answer_text === option.option_text}
                        onChange={(e) =>
                          onSetAnswers(question.question_id, "multiple-choice", e.target.value)
                        }
                        className="form-radio focus:ring-primary"
                      />
                      <span>{option.option_text}</span>
                    </label>
                  ))}
                </div>
              </div>
            );

          case "checkboxes":
            return (
              <div key={question.question_id} className="space-y-2">
                <p className="font-medium">{question.question_text}</p>
                <div className="space-y-1">
                  {question.options.map((option) => (
                    <label key={option.option_id} className="flex items-center space-x-2">
                      <input
                        disabled
                        type="checkbox"
                        value={option.option_text}
                        checked={(answers[question.question_id]?.answer_value || []).includes(
                          option.option_text
                        )}
                        onChange={(e) =>
                          onSetAnswers(question.question_id, "checkboxes", e.target.value, true)
                        }
                        className="form-checkbox focus:ring-primary"
                      />
                      <span>{option.option_text}</span>
                    </label>
                  ))}
                </div>
              </div>
            );

          case "dropdown":
            return (
              <div key={question.question_id} className="space-y-2">
                <label htmlFor={`dropdown-${question.question_id}`} className="font-medium">
                  {question.question_text}
                </label>
                <select
                  disabled
                  id={`dropdown-${question.question_id}`}
                  required={question.is_required}
                  value={answers[question.question_id]?.answer_text || ""}
                  onChange={(e) =>
                    onSetAnswers(question.question_id, "dropdown", e.target.value)
                  }
                  className="w-full p-3 border rounded-md bg-background dark:bg-background-dark text-text dark:text-text-dark border-border focus:outline-none focus:ring-2 focus:ring-primary"
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
