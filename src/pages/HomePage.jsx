import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  function createForm() {
    const id = uuidv4()
    console.log(id);
    navigate(`/cform/${id}`)
  }

  return (
    <div>
      Home Page
      <button onClick={createForm}>
        Create Form
      </button>
    </div>
  )
}
