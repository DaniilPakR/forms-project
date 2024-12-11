import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function NewFormQuestions({
  questions,
  onDeleteQuestion,
  onUpdateQuestion,
}) {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <div key={question.id} className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <h1 className="underline">Question {index + 1}</h1>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="question-type">Type</InputLabel>
                <Select
                  labelId="question-type"
                  id="question-type"
                  value={question.questionType}
                  label="Type"
                  onChange={(e) =>
                    onUpdateQuestion(question.id, "questionType", e.target.value)
                  }
                >
                  <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
                  <MenuItem value="checkboxes">Checkboxes</MenuItem>
                  <MenuItem value="short-answer">Short Answer</MenuItem>
                </Select>
              </FormControl>
            </div>
            <input
              type="text"
              value={question.questionTitle}
              placeholder="Question"
              className="bg-gray-200 p-4"
              onChange={(e) =>
                onUpdateQuestion(question.id, "questionTitle", e.target.value)
              }
            />
            <div className="flex flex-row justify-between items-center">
              <button
                onClick={() =>
                  onUpdateQuestion(question.id, "required", !question.required)
                }
                className={`flex flex-row items-center gap-2 px-3 lg:px-4 py-2 bg-${
                  question.required ? "green" : "gray"
                }-500 text-white font-medium rounded hover:bg-${
                  question.required ? "green" : "gray"
                }-600 focus:ring focus:ring-blue-300`}
              >
                <FontAwesomeIcon
                  className="mt-1"
                  icon={question.required ? faToggleOn : faToggleOff}
                />
                <p>Required</p>
              </button>
              <button
                className="flex flex-row items-center gap-2 px-3 lg:px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 focus:ring focus:ring-blue-300"
                onClick={() => onDeleteQuestion(question.id)}
              >
                <FontAwesomeIcon icon={faSquareMinus} />
                <p>Delete</p>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
