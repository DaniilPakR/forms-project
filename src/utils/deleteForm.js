import { redirect } from "react-router-dom";

export const deleteForm = async (form_id) => {
  try {
    const response = await fetch(`http://localhost:5000/forms/delete/${form_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({form_id}),
    });
    if (!response.ok) {
      throw new Error("Error deleting form.")
    };
    console.log("Successfully deleted form");
  } catch (err) {
    console.error(err.message)
  }
}