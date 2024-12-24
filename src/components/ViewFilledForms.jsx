import { Link } from "react-router-dom";

export default function ViewFilledForms({ responses }) {

  console.log(responses);

  return (
    <div className="flex flex-col">
      <h1>Read forms:</h1>
      {responses.filledForms.map((filledForm) => (
        <div className="flex flex-row justify-between items-center">
          <h3>
            {filledForm.user_name}, {filledForm.user_email}
          </h3>
          <h3>
            Date Submitted:
            {new Date(filledForm.filled_at).toLocaleDateString()}
          </h3>
          <Link to={`/vform/${responses.form.page_id}`} className="bg-primary text-button-text text-center py-1 px-2 rounded hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary">
            View in read mode
          </Link>
        </div>
      ))}
    </div>
  );
}
