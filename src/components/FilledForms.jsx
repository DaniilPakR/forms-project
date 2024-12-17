import { useContext, useEffect, useState } from "react"

export default function FilledForms({ form_id }) {
  
  const [filledForms, setFilledForms] = useState([]);

  useEffect(() => {
    async function fetchFilledForms() {
      try {
        const response = await fetch(`http://localhost:5000/filled-forms/${form_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch filled forms.");
        };
        const result = await response.json();
        setFilledForms(result);
      } catch (err) {
        console.error("Error: ", err.message)
      }
    };
    fetchFilledForms();
  }, [])

  return (
    <div>
      
    </div>
  )
}