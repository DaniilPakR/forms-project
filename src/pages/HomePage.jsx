import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import CreatedForms from "../components/CreatedForms";
import { GlobalContext } from "../context/GlobalProvider";

export default function HomePage() {
  const { currentUser } = useContext(GlobalContext)
  const navigate = useNavigate();

  function createForm() {
    const id = uuidv4();
    console.log(id);
    navigate(`/cform/${id}`);
  }

  return (
    <div className="flex flex-col mt-16 bg-background dark:bg-background-dark">
      <CreatedForms />
      {currentUser && <button className="self-start" onClick={createForm}>Create Form</button>}
    </div>
  );
}
