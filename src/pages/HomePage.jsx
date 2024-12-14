import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import CreatedForms from "../components/CreatedForms";

export default function HomePage() {
  const navigate = useNavigate();

  function createForm() {
    const id = uuidv4();
    console.log(id);
    navigate(`/cform/${id}`);
  }

  return (
    <div className="flex flex-col mt-5">
      <CreatedForms />
      <button className="self-start" onClick={createForm}>Create Form</button>
    </div>
  );
}
