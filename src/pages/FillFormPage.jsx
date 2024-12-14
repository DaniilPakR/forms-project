import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FillFormQuestions from "../components/FillFormQuestions";
import FillForm from "../components/FillForm";

export default function FillFormPage() {

  const [formData, setFormData] = useState(null)
  const { id: form_id } = useParams();
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false)

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
      } catch (err) {
        console.error("Error fetching form:", err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchForm();
  }, [form_id]);

  console.log(formData)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!formData) {
    return <p>No form data available.</p>
  }

  return (
    <FillForm answers={answers} setAnswers={setAnswers} formData={formData} />
  )
}