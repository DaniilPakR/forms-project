import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import NewFormHeader from "../components/NewFormHeader";
import NewFormQuestions from "../components/NewFormQuestions";

export default function FormCreationPage() {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formQuestions, setFormQuestions] = useState([
    {
      questionTitle: "",
      id: uuidv4(),
      questionType: "multiple-choice",
      required: false,
      options: [
        {
          text: "",
        },
      ],
    },
  ]);

  const addQuestion = () => {
    setFormQuestions((prevFormQuestions) => [
      ...prevFormQuestions,
      {
        questionTitle: "",
        id: uuidv4(),
        questionType: "multiple-choice",
        required: false,
        options: [
          {
            text: "",
          },
        ],
      },
    ]);
  };

  const deleteQuestion = (id) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.filter((question) => question.id !== id)
    );
  };

  const updateQuestion = (id, key, value) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.id === id ? { ...question, [key]: value } : question
      )
    );
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-4/5 lg:w-1/2 border border-solid bg-white rounded-md border-blue-500 py-4 px-5 gap-3 flex flex-col">
        <h1 className="text-center text-xl border-b border-black pb-2">Form</h1>
        <h1 className="underline">Header</h1>
        <NewFormHeader
          title={formTitle}
          setTitle={setFormTitle}
          description={formDescription}
          setDescription={setFormDescription}
        />
        <h1 className="underline">Questions</h1>
        <NewFormQuestions
          questions={formQuestions}
          onDeleteQuestion={deleteQuestion}
          onUpdateQuestion={updateQuestion}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:ring focus:ring-blue-300"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
