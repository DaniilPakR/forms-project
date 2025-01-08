import { useEffect, useState, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { GlobalContext } from "../context/GlobalProvider";
import ViewFilledForm from "../components/form-viewing/ViewFilledForm";

export default function ViewFormPage() {
  const [ searchParams ] = useSearchParams();
  const mode = searchParams.get('mode')
  const { currentUser, URL } = useContext(GlobalContext);
  const [formData, setFormData] = useState(null);
  const { id: filled_form_id } = useParams();
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchForm() {
      try {
        const response = await fetch(`${URL}/view-filled-form/${filled_form_id}`);
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
  }, [filled_form_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(formData);

  return (
    <div className="flex flex-col items-center mt-16">
      {formData && <ViewFilledForm mode={mode} formData={formData.form} answers={formData.answers} questions={formData.questions} />}
    </div>
  );
}
