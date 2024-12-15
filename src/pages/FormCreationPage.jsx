import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { DndContext, closestCorners } from "@dnd-kit/core";

import NewFormHeader from "../components/NewFormHeader";
import NewFormQuestions from "../components/NewFormQuestions";
import { GlobalContext } from "../context/GlobalProvider";
import { arrayMove } from "@dnd-kit/sortable";

export default function FormCreationPage() {
  const { id: pageId } = useParams();
  const { currentUser } = useContext(GlobalContext);
  let currentUserId;
  if (currentUser) {
    currentUserId = currentUser["id"];
  }
  
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formDescriptionMarkdown, setFormDescriptionMarkdown] = useState([]);
  const [formTitleMarkdown, setFormTitleMarkdown] = useState([]);
  const [formTopic, setFormTopic] = useState("topic");
  const [formTags, setFormTags] = useState([]);
  const [formImage, setFormImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [formQuestions, setFormQuestions] = useState([
    {
      question_text: "Untitled Question",
      question_id: uuidv4(),
      question_type: "short-answer",
      is_required: false,
      position: 1,
      show_in_results: false,
      options: [
        {
          option_text: "Option 1",
          option_id: uuidv4(),
          is_correct: false,
          position: 1,
        },
      ],
    },
  ]);

  const handleAddQuestion = () => {
    setFormQuestions((prevFormQuestions) => [
      ...prevFormQuestions,
      {
        question_text: "Untitled Question",
        question_id: uuidv4(),
        question_type: "short-answer",
        is_required: false,
        position: prevFormQuestions.length + 1,
        show_in_results: false,
        options: [
          {
            option_text: "Option 1",
            option_id: uuidv4(),
            is_correct: false,
            position: 1,
          },
        ],
      },
    ]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDeleteQuestion = (questionId) => {
    setFormQuestions((prevFormQuestions) => {
      const filteredQuestions = prevFormQuestions.filter(
        (q) => q.question_id !== questionId
      );
  
      // Reassign positions after deletion
      return filteredQuestions.map((q, index) => ({
        ...q,
        position: index,
      }));
    });
  };

  const handleUpdateQuestion = (id, key, value) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.question_id === id ? { ...question, [key]: value } : question
      )
    );
  };

  const handleUpdateOptions = (id, idx, value) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.question_id === id
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === idx ? { ...option, option_text: value } : option
              ),
            }
          : question
      )
    );
  };

  const handleDeleteOption = (questionId, optionId) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.question_id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.option_id !== optionId
              ),
            }
          : question
      )
    );
  };

  const handleDuplicateQuestion = (questionId) => {
    setFormQuestions((prevFormQuestions) => {
      const questionToDuplicate = prevFormQuestions.find(
        (question) => question.question_id === questionId
      );

      if (!questionToDuplicate) return prevFormQuestions;

      const duplicatedQuestion = {
        ...questionToDuplicate,
        question_id: uuidv4(),
        position: prevFormQuestions.length + 1,
        options: questionToDuplicate.options.map((option) => ({
          ...option,
          option_id: uuidv4(),
        })),
      };

      return [...prevFormQuestions, duplicatedQuestion];
    });
  };

  const handleUploadForm = async () => {
    try {
      await action({
        formTitle,
        formTitleMarkdown,
        formDescription,
        formDescriptionMarkdown,
        formQuestions,
        formTopic,
        formImage,
        isPublic,
        currentUserId,
        pageId
      });
      alert("Form uploaded successfully!");
    } catch (error) {
      alert("Failed to upload the form. Please try again.");
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
  
    setFormQuestions((prevFormQuestions) => {
      const oldIndex = prevFormQuestions.findIndex(
        (q) => q.position === active.id
      );
      const newIndex = prevFormQuestions.findIndex(
        (q) => q.position === over.id
      );
  
      // Update positions to reflect the new order
      const updatedQuestions = arrayMove(prevFormQuestions, oldIndex, newIndex);
      return updatedQuestions.map((q, index) => ({
        ...q,
        position: index, // Reassign positions
      }));
    });
  };

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
          descriptionMarkdown={formDescriptionMarkdown}
          setDescriptionMarkdown={setFormDescriptionMarkdown}
          formTitleMarkdown={formTitleMarkdown}
          setFormTitleMarkdown={setFormTitleMarkdown}
          formTags={formTags}
          setFormTags={setFormTags}
          formTopic={formTopic}
          setFormTopic={setFormTopic}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
        />
        <h1 className="text-2xl lg:text-3xl font-semibold">Questions</h1>
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <NewFormQuestions
            questions={formQuestions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onUpdateOptions={handleUpdateOptions}
            onDeleteOption={handleDeleteOption}
            onDuplicateQuestion={handleDuplicateQuestion}
            setFormQuestions={setFormQuestions}
          />
        </DndContext>
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
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleUploadForm}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function action(formData) {
  const {
    formTitle,
    formTitleMarkdown,
    formDescription,
    formDescriptionMarkdown,
    formQuestions,
    formTopic,
    formImage,
    isPublic,
    currentUserId,
    pageId
  } = formData;

  const newForm = {
    title: formTitle,
    description: formDescription,
    descriptionmarkdown: formDescriptionMarkdown,
    topic: formTopic,
    imageUrl: formImage,
    isPublic,
    creatorId: currentUserId,
    questions: formQuestions.map((question, index) => ({
      questionTitle: question.question_text,
      questionType: question.question_type,
      required: question.is_required,
      options: question.options.map((option) => ({
        optionText: option.option_text,
        optionId: option.option_id,
      })),
    })),
    pageId,
    titlemarkdown: formTitleMarkdown
  };

  console.log(newForm);

  try {
    const response = await fetch("http://localhost:5000/forms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create the form.");
    }

    const result = await response.json();
    console.log("Form created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error uploading form:", error.message);
    throw error;
  }
}
