import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import NewFormOptions from "./NewFormOptions";

export default function NewFormQuestions({
  questions,
  onDeleteQuestion,
  onUpdateQuestion,
  onUpdateOptions,
  onDeleteOption,
  onDuplicateQuestion,
}) {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <div key={question.question_id} className="flex flex-col gap-2 border-t border-dashed border-black pt-3">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-nowrap text-xl font-semibold">
                Question {index + 1}
              </h1>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="question-type">Type</InputLabel>
                <Select
                  labelId="question-type"
                  id="question-type"
                  value={question.question_type}
                  label="Type"
                  onChange={(e) =>
                    onUpdateQuestion(
                      question.question_id,
                      "question_type",
                      e.target.value
                    )
                  }
                >
                  <MenuItem
                    value="short-answer"
                    className="flex flex-row items-center gap-2"
                  >
                    <ShortTextIcon className="text-gray-500" />
                    <span className="text-gray-800 ml-2">Short Answer</span>
                  </MenuItem>
                  <MenuItem
                    value="paragraph"
                    className="flex flex-row items-center gap-2"
                  >
                    <SubjectIcon className="text-gray-500" />
                    <span className="text-gray-800 ml-2">Paragraph</span>
                  </MenuItem>
                  <MenuItem
                    value="multiple-choice"
                    className="flex flex-row items-center gap-2"
                  >
                    <RadioButtonCheckedIcon className="text-gray-500" />
                    <span className="text-gray-800 ml-2">Multiple Choice</span>
                  </MenuItem>
                  <MenuItem
                    value="checkboxes"
                    className="flex flex-row items-center gap-2"
                  >
                    <CheckBoxIcon className="text-gray-500" />
                    <span className="text-gray-800 ml-2">Checkboxes</span>
                  </MenuItem>

                  <MenuItem
                    value="dropdown"
                    className="flex flex-row items-center gap-2"
                  >
                    <ArrowDropDownCircleIcon className="text-gray-500" />
                    <span className="text-gray-800 ml-2">Dropdown</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <input
              type="text"
              value={question.question_text}
              placeholder="Question"
              className="bg-gray-200 p-4"
              onChange={(e) =>
                onUpdateQuestion(question.question_id, "question_text", e.target.value)
              }
            />
            <NewFormOptions
              onDeleteOption={onDeleteOption}
              onUpdateOptions={onUpdateOptions}
              question={question}
              onUpdateQuestion={onUpdateQuestion}
            />
            <div className="flex flex-row justify-end items-center">
              <Tooltip placement="top" title="Duplicate question">
                <IconButton onClick={() => onDuplicateQuestion(question.question_id)}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={question.is_required}
                      onChange={() =>
                        onUpdateQuestion(
                          question.question_id,
                          "is_required",
                          !question.is_required
                        )
                      }
                      color="primary" // You can adjust the color as needed
                    />
                  }
                  label="Required"
                />
              </FormGroup>
              <Button
                color={"error"}
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => onDeleteQuestion(question.question_id)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
