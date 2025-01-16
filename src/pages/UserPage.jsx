import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { GlobalContext } from "../context/GlobalProvider";

export default function UserPage() {
  const { currentUser, t, URL, setCurrentUser } = useContext(GlobalContext);
  const [phoneNumber, setPhoneNumber] = useState("");

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authSession");
  };

  const handleSubmit = async () => {
    const formData = {
      firstName: currentUser.name,
      lastName: currentUser.surname,
      email: currentUser.email,
      phone: phoneNumber,
    };

    try {
      const response = await fetch(`${URL}/salesforce/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("success");
        console.log(result);
      } else {
        const errorData = await response.json();
        console.log("fail");
        throw new Error(errorData.error || "Failed to sync with Salesforce.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateApiToken = async () => {
    try {
      const response = await fetch(`${URL}/api/generate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("success");
        console.log(result);
      } else {
        const errorData = await response.json();
        console.log("fail");
        throw new Error(errorData.error || "Failed to sync with Salesforce.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Test", currentUser);

  return (
    <div className="mt-20 space-y-4 px-8 py-4">
      {currentUser && (
        <div className="flex flex-col space-y-3">
          <p className="w-full flex flex-col">
            <label htmlFor="">{t("userPage.phoneNumber")}:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-3 border-2 border-border dark:border-dark-accent bg-background dark:bg-background-dark text-text dark:text-text-dark rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 ease-in-out"
              placeholder={t("userPage.phoneNumber")}
            />
          </p>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition duration-200 ease-in-out"
          >
            {t("userPage.register")}
          </button>
        </div>
      )}
      {currentUser && (
        <button
          onClick={generateApiToken}
          className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-hover transition duration-200 ease-in-out"
        >
          {t("userPage.generateToken")}
        </button>
      )}
      {currentUser && (
        <button
          onClick={logout}
          className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out"
        >
          {t("header.logOut")}
        </button>
      )}
    </div>
  );
}
