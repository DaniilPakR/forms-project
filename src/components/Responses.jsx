import { useEffect, useState, useContext } from "react";
import ViewFilledForms from "./ViewFilledForms";
import QuestionStats from "./QuestionStats";

import { GlobalContext } from "../context/GlobalProvider";

export default function Responses({ form_id }) {
  const { URL } = useContext(GlobalContext);
  const [responses, setResponses] = useState(null);

  useEffect(() => {
    async function getResponses() {
      try {
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
      }
    }

    getResponses();
  }, [form_id]); // Include form_id as a dependency

  if (!responses) {
    return <p>Loading responses...</p>; // Add a loading message or spinner
  }

  return (
    <div>
      <ViewFilledForms responses={responses} />
      <QuestionStats
        questions={responses.questions || []}
        answers={responses.answers || []}
        answerOptions={responses.answerOptions || []}
      />
    </div>
  );
}
