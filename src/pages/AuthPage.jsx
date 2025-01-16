import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/auth/AuthForm";
import { externalContextReference } from "../context/GlobalProvider";

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center mt-20">
      <AuthForm />
    </div>
  );
}

export async function action({ request }) {
  const {
    setCurrentUser,
    setIsAdmin,
    URL: apiBaseURL,
    t,
  } = externalContextReference; // Rename URL to apiBaseURL
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
      surname: data.get("surname"),
      email: data.get("email"),
      password: data.get("password"),
    };
  } else if (mode === "login") {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  }

  const endpoint = mode === "signup" ? "/auth/register" : "/auth/login";

  try {
    const response = await fetch(`${apiBaseURL}${endpoint}`, {
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
    const userInfo = {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      surname: result.user.surname,
      is_blocked: result.user.is_blocked,
      is_admin: result.user.is_admin,
    };

    if (result.user.is_blocked) {
      toast.error(t("notifications.userIsBlocked"));
    }

    localStorage.setItem(
      "authSession",
      JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        surname: userInfo.surname,
      })
    );
    localStorage.setItem("isAdmin", userInfo.is_admin);
    console.log(result);
    mode === "signup"
      ? toast.success(t("notifications.signUp"))
      : toast.success(t("notifications.loggedIn"));
    setCurrentUser({
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      surname: result.user.surname,
    });
    setIsAdmin(userInfo.is_admin);
    return redirect("/");
  } catch (e) {
    console.error("Error in action:", e?.message || "Unknown error");
    toast.error(e?.message || "Authentication failed");
  }
}
