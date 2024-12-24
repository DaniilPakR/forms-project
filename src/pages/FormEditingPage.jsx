import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useParams, useNavigate } from "react-router-dom";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import NewFormHeader from "../components/NewFormHeader";
import NewFormQuestions from "../components/NewFormQuestions";
import { GlobalContext } from "../context/GlobalProvider";
import {
  uploadImageToCloudinary,
  fetchImageById,
  urlToFile,
} from "../utils/cloudinaryFunctions";
import Responses from "../components/Responses";
import { deleteForm } from "../utils/deleteForm";
import { convertTags, convertTagsBack } from "../utils/convertTags";

export default function FormCreationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);
  const { id: pageId } = useParams();
  const { currentUser } = useContext(GlobalContext);
  let currentUserId;
  if (currentUser) {
    currentUserId = currentUser["id"];
  }

  const [formId, setFormId] = useState();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formDescriptionMarkdown, setFormDescriptionMarkdown] =
    useState("normal");
  const [formTitleMarkdown, setFormTitleMarkdown] = useState([]);
  const [formTopic, setFormTopic] = useState("topic");
  const [formTags, setFormTags] = useState([]);
  const [formImage, setFormImage] = useState(false);
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
        },
      ],
    },
  ]);
  const [content, setContent] = useState("form");
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    setLoading(true);
    async function fetchForm() {
      try {
        const response = await fetch(`http://localhost:5000/eform/${pageId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch form");
        }

        const data = await response.json();
        let str = data.descriptionMarkdown;
        try {
          const markdownArray = JSON.parse(
            str.replace(/{/g, "[").replace(/}/g, "]")
          );
          setFormDescriptionMarkdown(markdownArray);
        } catch (error) {
          console.error("Failed to transform descriptionMarkdown:", error);
          setFormDescriptionMarkdown([]);
        }
        let strt = data.titleMarkdown;
        try {
          const markdownArray = JSON.parse(
            strt.replace(/{/g, "[").replace(/}/g, "]")
          );
          setFormTitleMarkdown(markdownArray);
        } catch (error) {
          console.error("Failed to transform titleMarkdown:", error);
          setFormTitleMarkdown([]);
        }
        console.log("SUCESS ",data)
        setForm(data);
        setFormTitle(data.title);
        setFormDescription(data.description);
        setFormTopic(data.topic);
        setFormImage(data["image_url"]);
        setIsPublic(data["is_public"]);
        setFormQuestions(data.questions);
        setFormId(data.form_id);
        setFormTags(convertTagsBack(data.tags));
        setUsers(data.users_with_access)
        const file = await urlToFile(pageId, "uploaded-image.jpg");
        setFormImage(file);

        setImagePreview(
          `https://res.cloudinary.com/dmi1xxumf/image/upload/${pageId}`
        );
      } catch (err) {
        console.error("Error fetching form:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchForm();
  }, [pageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormImage(true);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
          },
        ],
      },
    ]);
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
      usersWithAccess = users.map((user) => user.user_id);
    } else if (users.length === 0) {
      usersWithAccess = [];
    }
    try {
      await action({
        formTitle,
        formDescription,
        formDescriptionMarkdown,
        formQuestions,
        formTopic,
        formImage,
        isPublic,
        currentUserId,
        pageId,
        formId,
        formTitleMarkdown,
        tags,
        usersWithAccess
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

  if (!currentUser) {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center mt-16">
      {currentUser && (
        <div className="w-11/12 lg:w-1/2 border border-solid bg-background dark:bg-background-dark rounded-md border-black py-4 px-5 gap-3 flex flex-col">
          <div className="self-center">
            <button
              onClick={() => setContent("form")}
              className={`px-4 py-2 rounded ${
                content === "form"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setContent("responses")}
              className={`px-4 py-2 rounded ml-2 ${
                content === "responses"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Responses
            </button>
          </div>

          {/* Shared Header */}
          <h1 className="text-center text-xl border-b border-black pb-2">
            {content === "form" ? "Form" : "Responses"}
          </h1>
          <h1 className="text-2xl lg:text-3xl font-semibold">Header</h1>

          {content === "form" ? (
            <>
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
              />
              <h1 className="text-2xl lg:text-3xl font-semibold">Questions</h1>
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
            </>
          ) : (
            <Responses form_id={formId} />
          )}

          <div className="flex flex-row justify-between items-center mt-4">
            <Button variant="outlined">Cancel</Button>
            <div className="flex flex-row items-center gap-2">
              <Button
                variant="outlined"
                endIcon={<DeleteIcon />}
                onClick={async () => {
                  await deleteForm(formId);
                  window.location.href = "/";
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleUploadForm}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function action(formData) {
  const {
    formTitle,
    formDescription,
    formDescriptionMarkdown,
    formQuestions,
    formTopic,
    formImage,
    isPublic,
    currentUserId,
    pageId,
    formId,
    formTitleMarkdown,
    tags,
    usersWithAccess
  } = formData;

  if (!isPublic && usersWithAccess.length === 0) {
    throw new Error("Please provide at least one user for access control.");
  }

  const updatedForm = {
    title: formTitle,
    titlemarkdown: formTitleMarkdown,
    description: formDescription,
    descriptionmarkdown: formDescriptionMarkdown,
    topic: formTopic,
    imageUrl: false,
    isPublic,
    creatorId: currentUserId,
    questions: formQuestions.map((question, index) => ({
      questionId: question.question_id,
      questionTitle: question.question_text,
      questionType: question.question_type,
      required: question.is_required,
      options: question.options.map((option) => ({
        optionId: option.option_id,
        optionText: option.option_text,
      })),
    })),
    pageId,
    tags,
    accessControlUsers: usersWithAccess
  };

  try {
    const response = await fetch(`http://localhost:5000/forms/edit/${formId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedForm),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to edit the form.");
    }

    const result = await response.json();
    console.log("Form updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating form:", error.message);
    throw error;
  }
}
