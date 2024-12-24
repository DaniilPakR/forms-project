import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { GlobalContext } from "../context/GlobalProvider";
import FillForm from "../components/FillForm";
import ViewFilledForm from "../components/ViewFilledForm";

export default function ViewFormPage() {
  const { currentUser } = useContext(GlobalContext);
  const [formData, setFormData] = useState(null);
  const { id: form_id } = useParams();
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchForm() {
      try {
        const response = await fetch(`http://localhost:5000/eform/${form_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch form");
        }

        const data = await response.json();
        setFormData(data);
        console.log("first ", data);
      } catch (err) {
        console.error("Error fetching form:", err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchForm();
  }, [form_id]);

  useEffect(() => {
    if (formData) {
      async function fetchResponses() {
        try {
          const response = await fetch(
            `http://localhost:5000/forms/${formData.form_id}/details`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch responses");
          }
  
          const data = await response.json();
          const transformedAnswers = data.answers.reduce((acc, answer) => {
            acc[answer.question_id] = {
              answer_text: answer.answer_text,
              answer_value: answer.answer_value,
              question_type: answer.question_type,
            };
            return acc;
          }, {});
          setAnswers(transformedAnswers);
          console.log("Transformed answers: ", transformedAnswers);
        } catch (err) {
          console.error("Error fetching responses:", err.message);
        }
      }
  
      fetchResponses();
    }
  }, [formData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(formData);

  return (
    <div className="flex flex-col items-center mt-16">
      {formData && <ViewFilledForm formData={formData} answers={answers} />}
    </div>
  );
}
