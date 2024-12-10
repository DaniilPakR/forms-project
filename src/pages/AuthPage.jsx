import { redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  return (
    <div>
      <AuthForm />
    </div>
  )
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  if (mode !== "login" && mode !== "signup") {
    throw new Error("Selected mode doesn't exist");
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  }

  // Determine the API endpoint based on the mode
  const endpoint = mode === "signup" ? "/auth/register" : "/auth/login";

  try {
    const response = await fetch(`http://localhost:5000/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${mode}`)
    };

    const result = await response.json();

    return console.log("Nice")
  } catch (e) {
    console.error(e);
    return { error: e.message }
  }

}