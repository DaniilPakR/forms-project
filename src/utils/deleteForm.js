import { redirect } from "react-router-dom";

import { externalContextReference } from "../context/GlobalProvider";

export const deleteForm = async (form_id) => {

  const { URL } = externalContextReference;

  try {
    const response = await fetch(`${URL}/forms/delete/${form_id}`, {
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