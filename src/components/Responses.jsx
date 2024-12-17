import { useEffect, useState } from "react"

export default function Responses({form_id}) {

  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function getRespones() {
      try {
        const response = await fetch(`http://localhost:5000/forms/${form_id}/details`);
        if (!response.ok) {
          throw new Error("Error fetching details.")
        };
        const data = await response.json();
        console.log("Details: ", data);
      } catch (err) {
        console.error(err.message)
      }
    };
    getRespones();
  }, [responses])

  return (
    <div></div>
  )
}