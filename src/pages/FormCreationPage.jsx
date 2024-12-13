import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import NewFormHeader from "../components/NewFormHeader";
import NewFormQuestions from "../components/NewFormQuestions";

export default function FormCreationPage() {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formQuestions, setFormQuestions] = useState([
    {
      questionTitle: "Untitled Question",
      id: uuidv4(),
      questionType: "short-answer",
      required: false,
      options: [
        {
          optionText: "Option 1",
          optionId: uuidv4(),
        },
      ],
    },
  ]);

  const handleAddQuestion = () => {
    setFormQuestions((prevFormQuestions) => [
      ...prevFormQuestions,
      {
        questionTitle: "Untitled Question",
        id: uuidv4(),
        questionType: "short-answer",
        required: false,
        options: [
          {
            optionText: null,
          },
        ],
      },
    ]);
  };

  const handleDeleteQuestion = (id) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.filter((question) => question.id !== id)
    );
  };

  const handleUpdateQuestion = (id, key, value) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.id === id ? { ...question, [key]: value } : question
      )
    );
  };

  const handleUpdateOptions = (id, idx, value) => {
    let foundQuestion = formQuestions.find((question) => question.id === id);
    foundQuestion.options[idx].optionText = value;
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.id === id ? foundQuestion : question
      )
    );
  };

  const handleDeleteOption = (questionId, optionId) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.optionId !== optionId
              ),
            }
          : question
      )
    );
  };

  const handleDuplicateQuestion = (questionId) => {
    setFormQuestions((prevFormQuestions) => {
      const questionToDuplicate = prevFormQuestions.find(
        (question) => question.id === questionId
      );

      if (!questionToDuplicate) return prevFormQuestions;

      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: uuidv4(),
        options: questionToDuplicate.options.map((option) => ({
          ...option,
          optionId: uuidv4(),
        })),
      };

      return [...prevFormQuestions, duplicatedQuestion];
    });
  };

  console.log(formQuestions);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-4/5 lg:w-1/2 border border-solid bg-white rounded-md border-black py-4 px-5 gap-3 flex flex-col">
        <h1 className="text-center text-xl border-b border-black pb-2">Form</h1>
        <h1 className="text-2xl lg:text-3xl font-semibold">Header</h1>
        <NewFormHeader
          title={formTitle}
          setTitle={setFormTitle}
          description={formDescription}
          setDescription={setFormDescription}
        />
        <h1 className="text-2xl lg:text-3xl font-semibold">Questions</h1>
        <NewFormQuestions
          questions={formQuestions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
          onUpdateOptions={handleUpdateOptions}
          onDeleteOption={handleDeleteOption}
          onDuplicateQuestion={handleDuplicateQuestion}
        />
        <div className="w-full">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            sx={{
              textTransform: "none",
              width: "100%",
            }}
            startIcon={<AddIcon />}
          >
            Add Question
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Cancel
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
