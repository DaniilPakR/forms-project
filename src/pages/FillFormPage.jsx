import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalProvider";
import FillForm from "../components/FillForm";
import LikeButton from "../components/LikeButton";
import Comments from "../components/Comments";
import { toast } from "react-toastify";

export default function FillFormPage() {
  const navigate = useNavigate();
  const { currentUser, isAdmin, URL, isReady, t } = useContext(GlobalContext);
  const [formData, setFormData] = useState(null);
  const { id: form_id } = useParams();
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchForm() {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL}/eform/${form_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch form");
        }

        const data = await response.json();
        const hasAccess =
          data.is_public ||
          data.users_with_access.some(
            (user) => user.user_id === currentUser.id
          ) ||
          isAdmin ||
          currentUser.id === data.creator_id;

        if (!hasAccess) {
          throw new Error(t("fillForm.youDontHaveAccess"));
        }
        console.log(data);
        setFormData(data);
      } catch (err) {
        console.error("Error fetching form:", err.message);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchForm();
  }, [form_id]);

  const handleSetAnswers = (
    questionId,
    questionType,
    value,
    isCheckbox = false
  ) => {
    setAnswers((prevAnswers) => {
      if (isCheckbox) {
        const currentAnswers = prevAnswers[questionId]?.value || [];
        return {
          ...prevAnswers,
          [questionId]: {
            question_type: questionType,
            value: currentAnswers.includes(value)
              ? currentAnswers.filter((v) => v !== value)
              : [...currentAnswers, value],
          },
        };
      }

      return {
        ...prevAnswers,
        [questionId]: {
          question_type: questionType,
          value: value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingRequiredAnswers = formData.questions.some((question) => {
      if (question.is_required) {
        const answer = answers[question.question_id]?.value;

        if (
          question.question_type === "short-answer" &&
          (!answer || answer.trim() === "")
        ) {
          return true;
        }

        if (
          question.question_type === "multiple-choice" &&
          (!answer || answer.length === 0)
        ) {
          return true;
        }

        if (
          question.question_type === "checkboxes" &&
          (!answer || answer.length === 0)
        ) {
          return true;
        }

        if (
          question.question_type === "dropdown" &&
          (!answer || answer === "")
        ) {
          return true;
        }
      }
      return false;
    });

    if (missingRequiredAnswers) {
      toast.error(t("fillFormQuestions.fillAllRequiredFields"));
      return;
    }

    const submissionPayload = {
      form_id: formData.form_id,
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_email: currentUser.email,
      answers: Object.entries(answers).map(
        ([questionId, { question_type, value }]) => ({
          question_id: parseInt(questionId, 10),
          answer_text: typeof value === "string" ? value : null,
          answer_value: Array.isArray(value) ? value : null,
          question_type,
        })
      ),
    };

    try {
      const response = await fetch(`${URL}/filled-forms/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form answers.");
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      toast.success(t("fillForm.formSubmitted"));
      return navigate("/success");
    } catch (err) {
      console.error("Error submitting form answers:", err.message);
    }
  };

  if (!isReady) {
    return <p>Loading...</p>;
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!formData) {
    return <p>No form data available.</p>;
  }

  return (
    <form className="mt-16">
      <FillForm
        onSubmit={handleSubmit}
        answers={answers}
        setAnswers={setAnswers}
        formData={formData}
        onSetAnswers={handleSetAnswers}
        form_id={form_id}
      />
      {formData && (
        <LikeButton user_id={currentUser?.id} form_id={formData.form_id} />
      )}
      {formData && <Comments form_id={formData.form_id} />}
    </form>
  );
}
