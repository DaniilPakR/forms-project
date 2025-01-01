import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { redirect, useParams, useNavigate } from "react-router-dom";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import NewFormHeader from "../components/NewFormHeader";
import NewFormQuestions from "../components/NewFormQuestions";
import {
  GlobalContext,
  externalContextReference,
} from "../context/GlobalProvider";
import { uploadImageToCloudinary } from "../utils/cloudinaryFunctions";
import { convertTags } from "../utils/convertTags";

export default function FormCreationPage() {
  const navigate = useNavigate();
  const { id: pageId } = useParams();
  const { currentUser, URL, t } = useContext(GlobalContext);
  let currentUserId;
  if (currentUser) {
    currentUserId = currentUser["id"];
  }

  const [formType, setFormType] = useState("form");
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
      question_text: t("newFormQuestion.untitledQuestion"),
      question_id: uuidv4(),
      question_type: "short-answer",
      is_required: false,
      position: 1,
      show_in_results: true,
      is_with_score: false,
      score: 0,
      correct_answer: "",
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleAddQuestion = () => {
    setFormQuestions((prevFormQuestions) => [
      ...prevFormQuestions,
      {
        question_text: "Untitled Question",
        question_id: uuidv4(),
        question_type: "short-answer",
        is_required: false,
        position: prevFormQuestions.length + 1,
        show_in_results: true,
        is_with_score: false,
        score: 0,
        correct_answer: "",
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
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteQuestion = (questionId) => {
    setFormQuestions((prevFormQuestions) => {
      const filteredQuestions = prevFormQuestions.filter(
        (q) => q.question_id !== questionId
      );

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

  const handleUpdateCorrectOption = (id, idx, value) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.question_id === id
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === idx ? { ...option, is_correct: value } : option
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
    let tags;
    if (formTags === "") {
      tags = [];
    } else if (formTags.length > 0) {
      tags = convertTags(formTags);
    }
    let usersWithAccess;
    if (users.length > 0) {
      usersWithAccess = users.map((user) => user.user_email);
    } else if (users.length === 0) {
      usersWithAccess = [];
    }
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
        pageId,
        tags,
        usersWithAccess,
        formType,
      });
      try {
        if (!formImage) {
          return;
        }
        const uploadedImage = await uploadImageToCloudinary(formImage, pageId);
        console.log(uploadedImage);
      } catch (e) {
        console.error(e.message);
      }
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

      const updatedQuestions = arrayMove(prevFormQuestions, oldIndex, newIndex);
      return updatedQuestions.map((q, index) => ({
        ...q,
        position: index,
      }));
    });
  };

  console.log(formQuestions);

  return (
    <div className="flex flex-col items-center mt-16">
      {currentUser && (
        <div className="w-11/12 lg:w-1/2 border border-solid bg-background dark:bg-background-dark text-text dark:text-text-dark rounded-md border-black py-4 px-5 gap-3 flex flex-col">
          <h1 className="text-center text-xl border-b border-black pb-2">
            {t("form.title")}
          </h1>
          <h1 className="text-2xl lg:text-3xl font-semibold">
            {t("form.header")}
          </h1>
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
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            usersWithAccess={users}
            setUsersWithAccess={setUsers}
            formType={formType}
            setFormType={setFormType}
          />
          <h1 className="text-2xl lg:text-3xl font-semibold">
            {t("form.questions")}
          </h1>
          <span className="text-xs text-gray-400">{t("form.quizHint")}</span>
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <NewFormQuestions
              questions={formQuestions}
              onDeleteQuestion={handleDeleteQuestion}
              onUpdateQuestion={handleUpdateQuestion}
              onUpdateOptions={handleUpdateOptions}
              onDeleteOption={handleDeleteOption}
              onDuplicateQuestion={handleDuplicateQuestion}
              setFormQuestions={setFormQuestions}
              formType={formType}
              onCorrectChange={handleUpdateCorrectOption}
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
              {t("form.addQuestionButton")}
            </Button>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              {t("form.cancelButton")}
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleUploadForm}
            >
              {t("form.uploadButton")}
            </Button>
          </div>
        </div>
      )}
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
    pageId,
    tags,
    usersWithAccess,
    formType,
  } = formData;

  const { URL } = externalContextReference;

  if (!isPublic && usersWithAccess.length === 0) {
    throw new Error("Please provide at least one user for access control.");
  }

  const newForm = {
    title: formTitle,
    description: formDescription,
    descriptionmarkdown: formDescriptionMarkdown,
    topic: formTopic,
    imageUrl: formImage ? "true" : "false",
    isPublic,
    formType,
    creatorId: currentUserId,
    questions: formQuestions.map((question, index) => ({
      questionTitle: question.question_text,
      questionType: question.question_type,
      required: question.is_required,
      showInResults: question.show_in_results,
      is_with_score: question.is_with_score,
      score: question.score,
      correct_answer: question.correct_answer,
      options: question.options.map((option) => ({
        optionText: option.option_text,
        optionId: option.option_id,
        is_correct: option.is_correct,
        position: option.position,
      })),
    })),
    pageId,
    titlemarkdown: formTitleMarkdown,
    tags,
    usersWithAccess,
  };

  console.log(newForm);

  try {
    const response = await fetch(`${URL}/forms/create`, {
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
    return redirect(`/eform/${pageId}`);
  } catch (error) {
    console.error("Error uploading form:", error.message);
    throw error;
  }
}
