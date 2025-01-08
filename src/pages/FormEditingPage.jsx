import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useParams, useNavigate } from "react-router-dom";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import NewFormHeader from "../components/form-uploading/NewFormHeader";
import NewFormQuestions from "../components/form-uploading/NewFormQuestions";
import {
  externalContextReference,
  GlobalContext,
} from "../context/GlobalProvider";
import {
  uploadImageToCloudinary,
  fetchImageById,
  urlToFile,
  deleteImageInCloud,
} from "../utils/cloudinary/cloudinaryFunctions";
import Responses from "../components/form-uploading/Responses";
import { deleteForm } from "../utils/form-utils/deleteForm";
import { convertTags, convertTagsBack } from "../utils/tags-utils/convertTags";
import { toast } from "react-toastify";
import Comments from "../components/social-actions/Comments";

export default function FormCreationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);
  const { id: pageId } = useParams();
  const { currentUser, URL, t } = useContext(GlobalContext);
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
  const [formImage, setFormImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [formType, setFormType] = useState("form");
  const [imageUrl, setImageUrl] = useState(null);
  const [formQuestions, setFormQuestions] = useState([
    {
      question_text: "Untitled Question",
      question_id: uuidv4(),
      question_type: "short-answer",
      is_required: false,
      position: 1,
      show_in_results: true,
      correct_answer: "",
      is_with_score: false,
      score: 0,
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
    async function fetchForm() {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/eform/${pageId}`);
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
        console.log("SUCESS ", data);
        setForm(data);
        setFormTitle(data.title);
        setFormDescription(data.description);
        setFormTopic(data.topic);
        setIsPublic(data["is_public"]);
        setFormQuestions(data.questions);
        setFormId(data.form_id);
        setFormTags(convertTagsBack(data.tags));
        setUsers(data.users_with_access);
        if (data["image_url"]) {
          const file = await urlToFile(pageId, "uploaded-image.jpg");
          setFormImage(file);
          setImagePreview(
            `https://res.cloudinary.com/dmi1xxumf/image/upload/v${data["image_version"]}/${pageId}`
          );
          setImageUrl(data["image_url"]);
        }
      } catch (err) {
        console.error("Error fetching form:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchForm();
  }, [pageId]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormImage(file);
      setImagePreview(window.URL.createObjectURL(file));
    }
  };

  const deleteImageFromCLoudinary = async () => {
    await deleteImageInCloud(imageUrl);
  };

  const handleRemoveImage = () => {
    setFormImage(null);
    setImagePreview(null);
    deleteImageFromCLoudinary();
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
        show_in_results: true,
        correct_answer: "",
        is_with_score: false,
        score: 0,
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

  const handleUpdateOptionCorrect = (questionId, optionId) => {
    setFormQuestions((prevFormQuestions) =>
      prevFormQuestions.map((question) =>
        question.question_id === questionId
          ? {
              ...question,
              options: question.options.map((option, index) =>
                option.option_id === optionId ? { ...option, is_correct: !option.is_correct } : option
              ),
            }
          : question
      )
    );
  }

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
    let imageVersion;
    let newImageUrl;
    console.log("c",formImage)
    if (!formImage) {
      if (imageUrl) {
        await deleteImageInCloud(imageUrl);
      }
      imageVersion = "";
    } else if (formImage) {
      if (imageUrl) {
        await deleteImageInCloud(imageUrl);
      }
      const uploadedImage = await uploadImageToCloudinary(formImage, pageId);
      newImageUrl = uploadedImage.public_id;
      imageVersion = uploadedImage.version;
    }

    try {
      await action({
        formTitle,
        formDescription,
        formDescriptionMarkdown,
        formQuestions,
        formTopic,
        imageUrl: newImageUrl,
        isPublic,
        currentUserId,
        pageId,
        formId,
        formTitleMarkdown,
        tags,
        usersWithAccess,
        imageVersion,
        formType,
      });
      toast.success(t("formEditingPage.editedSuccessfully"));
    } catch (error) {
      console.error("Failed to upload form:", JSON.stringify(error.message));
      toast.error(t("formEditingPage.failedEditing"));
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

  console.log(formImage);

  return (
    <>
      <div className="flex flex-col items-center mt-16 px-4">
        {currentUser && (
          <div
            style={{
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(30, 58, 138, 0.15)`,
            }}
            className="w-full max-w-4xl border-t-4 border-b bg-white dark:bg-gray-800 rounded-lg p-6 gap-6 flex flex-col"
          >
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setContent("form")}
                className={`transition px-6 py-2 rounded-md text-sm font-medium ${
                  content === "form"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {t("formEditingPage.form")}
              </button>
              <button
                onClick={() => setContent("responses")}
                className={`transition px-6 py-2 rounded-md text-sm font-medium ${
                  content === "responses"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {t("formEditingPage.responses")}
              </button>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center">
              {t("formEditingPage.header")}
            </h2>
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
                  onRemoveImage={handleRemoveImage}
                  formImage={formImage}
                  formType={formType}
                  setFormType={setFormType}
                />
                <h1 className="text-2xl lg:text-3xl font-semibold">
                  {t("formEditingPage.questions")}
                </h1>
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
                    onUpdateOptionCorrect={handleUpdateOptionCorrect}
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

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <Button
                variant="outlined"
                className="w-full sm:w-auto mb-2 sm:mb-0"
              >
                {t("formEditingPage.cancel")}
              </Button>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <Button
                  variant="outlined"
                  endIcon={<DeleteIcon />}
                  onClick={async () => {
                    await deleteForm(formId);
                    window.location.href = "/";
                  }}
                  className="w-full sm:w-auto mb-2 sm:mb-0"
                >
                  {t("formEditingPage.delete")}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleUploadForm}
                  className="w-full sm:w-auto"
                >
                  {t("formEditingPage.update")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {form && <Comments form_id={form.form_id} />}
    </>
  );
}

export async function action(formData) {
  const {
    formTitle,
    formDescription,
    formDescriptionMarkdown,
    formQuestions,
    formTopic,
    imageUrl,
    isPublic,
    currentUserId,
    pageId,
    formId,
    formTitleMarkdown,
    tags,
    usersWithAccess,
    imageVersion,
    formType,
  } = formData;

  const { URL: apiUrl } = externalContextReference;

  if (!isPublic && usersWithAccess.length === 0) {
    throw new Error("Please provide at least one user for access control.");
  }

  const updatedForm = {
    title: formTitle,
    titlemarkdown: formTitleMarkdown,
    description: formDescription,
    descriptionmarkdown: formDescriptionMarkdown,
    topic: formTopic,
    imageUrl,
    isPublic,
    creatorId: currentUserId,
    questions: formQuestions.map((question, index) => ({
      questionId: question.question_id,
      questionTitle: question.question_text,
      questionType: question.question_type,
      required: question.is_required,
      showInResults: question.show_in_results,
      is_with_score: question.is_with_score,
      score: question.score,
      correct_answer: question.correct_answer,
      options: question.options.map((option) => ({
        optionId: option.option_id,
        optionText: option.option_text,
        is_correct: option.is_correct,
      })),
    })),
    pageId,
    tags,
    accessControlUsers: usersWithAccess,
    imageVersion,
    formType,
  };

  try {
    const response = await fetch(`${apiUrl}/forms/edits/${formId}`, {
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
    console.error("Error updating form:", JSON.stringify(error.message));
    toast.error("Failed to update form.");
  }
}
