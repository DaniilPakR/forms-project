import { redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { externalContextReference } from "../context/GlobalProvider";

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center mt-10">
      <AuthForm />
    </div>
  );
}

export async function action({ request }) {
  const { setCurrentUser } = externalContextReference
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  if (mode !== "login" && mode !== "signup") {
    throw new Error("Selected mode doesn't exist");
  }

  const data = await request.formData();
  let authData;
  if (mode === "signup") {
    authData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
  } else if (mode === "login") {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  }

  // Determine the API endpoint based on the mode
  const endpoint = mode === "signup" ? "/auth/register" : "/auth/login";

  try {
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to ${mode}`);
    }

    const result = await response.json();

    // Store user info in localStorage and context
    const userInfo = {
      id: result.user.id, // Store user_id
      email: result.user.email,
      name: result.user.name,
    };

    console.log(userInfo)

    localStorage.setItem("authSession", JSON.stringify(userInfo));
    setCurrentUser(userInfo); // Store full user info in context

    return redirect("/");
  } catch (e) {
    console.error("Error in action:", e.message);
    return { error: e.message };
  }
}