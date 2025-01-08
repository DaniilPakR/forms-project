import { useEffect, useState, useContext } from "react";
import ViewFilledForms from "../form-viewing/ViewFilledForms";
import QuestionStats from "./QuestionStats";

import { GlobalContext } from "../../context/GlobalProvider";

export default function Responses({ form_id }) {
  const { URL, t } = useContext(GlobalContext);
  const [responses, setResponses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getResponses() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${URL}/forms/${form_id}/details`
        );
        if (!response.ok) {
          throw new Error("Error fetching details.");
        }
        const data = await response.json();
        setResponses(data);
        console.log("Details: ", data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getResponses();
  }, [form_id]);

  if (isLoading) {
    return <p>{t("loading.loading")}</p>;
  }

  if (!responses && !isLoading) {
    return <p>{t("questionStats.noResponses")}</p>;
  }

  return (
    <div>
      {responses.likes.length > 0 && (
        <p className="m-1">💖{responses.likes.length} {t("responses.amountUsersLiked")}</p>
      )}
      {responses.comments.length > 0 && (
        <p className="m-1">💬{responses.comments.length} {t("responses.amountUsersCommented")}</p>
      )}
      <ViewFilledForms responses={responses} />
      <QuestionStats
        questions={responses.questions || []}
        answers={responses.answers || []}
        answerOptions={responses.answerOptions || []}
      />
    </div>
  );
}
