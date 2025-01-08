import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalProvider";
import FillForm from "../components/form-filling/FillForm";
import LikeButton from "../components/social-actions/LikeButton";
import Comments from "../components/social-actions/Comments";
import { toast } from "react-toastify";
import { TonalitySharp } from "@mui/icons-material";

export default function FillFormPage() {
  const navigate = useNavigate();
  const { currentUser, isAdmin, URL, isReady, t } = useContext(GlobalContext);
  const [formData, setFormData] = useState(null);
  const { id: form_id } = useParams();
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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

  useEffect(() => {
    async function checkIsSubmitted() {
      try {
        const response = await fetch(
          `${URL}/get-filled-forms-by-user/${currentUser.id}`
        );
  
        if (!response.ok) {
          return toast.error(t("fillForm.failedToCheckSubmission"));
        }
  
        const data = await response.json();
  
        if (data.exists) {
          setIsSubmitted(true);
        } else {
          setIsSubmitted(false);
        }
      } catch (err) {
        console.error("Error checking submission status:", err);
        return toast.error(t("fillForm.errorCheckingSubmission", err))
      }
    }
  
    if (currentUser) {
      checkIsSubmitted();
    }
  }, [currentUser, URL]);

  const calculateScore = () => {
    if (!formData || !formData.questions || !answers) return 0;
  
    let totalScore = 0;
  
    formData.questions.forEach((question) => {
      const userAnswer = answers[question.question_id]?.value;
  
      if (!userAnswer) return;
  
      if (question.question_type === "short-answer" || question.question_type === "dropdown") {
        if (userAnswer === question.correct_answer) {
          totalScore += question.is_with_score ? question.score : 1;
        }
      } else if (question.question_type === "checkboxes" || question.question_type === "multiple-choice") {
        const correctOptions = question.options.filter((option) => option.is_correct).map((opt) => opt.option_text);
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === correctOptions.length &&
          userAnswer.every((answer) => correctOptions.includes(answer))
        ) {
          totalScore += question.is_with_score ? question.score : 1;
        }
      }
    });
  
    return totalScore;
  };
  

  const refill = async () => {
    try {
      const response = await fetch(`${URL}/delete-filled-form/${currentUser.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        return toast.error(t("fillForm.failedToDelete"));
      }
  
      toast.success(t("fillForm.deletedFilledForm"));
      setIsSubmitted(false);
    } catch (err) {
      toast.error(err.message || t("fillForm.errorWhileDeleting"));
    }
  };  

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

    const score = calculateScore();
    setScore(score);

    const submissionPayload = {
      form_id: formData.form_id,
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_email: currentUser.email,
      score,
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
      setIsSubmitted(true);
      return;
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
      {isSubmitted ? (
        <div className="flex flex-col items-center mt-8">
          <div
            style={{
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(30, 58, 138, 0.15)`,
            }}
            className="w-full max-w-4xl border-t-4 border-b bg-white dark:bg-gray-800 rounded-lg p-6 gap-6 flex flex-col items-center"
          >
            {formData.form_type === "quiz" && <p>Your score is: {score}</p>}
            <h1 className="text-center text-2xl lg:text-3xl font-semibold text-primary">
              {t("fillForm.alreadySubmitted")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mt-4">
              {t("fillForm.refillPrompt")}
            </p>
            <div className="flex justify-center mt-6 gap-4">
              <button
                className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-6 rounded-md"
                type="button"
                onClick={refill}
                >
                {t("fillForm.refillButton")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <FillForm
          onSubmit={handleSubmit}
          answers={answers}
          setAnswers={setAnswers}
          formData={formData}
          onSetAnswers={handleSetAnswers}
          form_id={form_id}
          isSubmitted={isSubmitted}
        />
      )}

      {formData && (
        <LikeButton user_id={currentUser?.id} form_id={formData.form_id} />
      )}
      {formData && <Comments form_id={formData.form_id} />}
    </form>
  );
}
