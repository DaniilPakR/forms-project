import { useContext, useRef, useState } from "react";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { GlobalContext } from "../../context/GlobalProvider";
import telegram from "../../images/socials/telegram.png";
import itr from "../../images/socials/Itransition.png";

export default function Footer() {
  const { t, URL, currentUser } = useContext(GlobalContext);
  const dialog = useRef();
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("Low");

  const createTicket = async (e) => {
    e.preventDefault();
    const pageUrl = window.location.href;

    try {
      const response = await fetch(`${URL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: summary,
          priority: priority,
          userId: currentUser.id,
          templateTitle: "Template Title",
          pageLink: pageUrl,
          displayName: currentUser.name,
          email: currentUser.email,
        }),
      });

      const text = await response.text();
      console.log("Response Text:", text);

      if (response.ok) {
        const data = JSON.parse(text);
        console.log("Ticket Created:", data);
      } else {
        const errorData = JSON.parse(text);
        console.error("Error Data:", errorData);
      }
    } catch (error) {
      console.error("Error creating ticket:", error.message);
    }
  };

  return (
    <div className="bg-background-accent dark:bg-background-dark-accent text-text-dark-muted py-12 px-6 mt-96 -mb-10">
      <dialog
        ref={dialog}
        className="bg-background dark:bg-background-dark border border-border dark:border-border-dark p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <p>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-text dark:text-text-dark mb-2"
          >
            {t("footer.summary")}:
          </label>
          <textarea
            type="text"
            placeholder={t("footer.summary")}
            id="summary"
            name="summary"
            value={summary}
            className="w-full p-3 border border-border dark:border-border-dark bg-background dark:bg-background-dark text-text dark:text-text-dark rounded-md shadow-sm focus:ring-2 focus:ring-primary hover:border-primary dark:hover:border-primary-dark focus:outline-none"
            onChange={(e) => setSummary(e.target.value)}
          />
        </p>

        <div className="mt-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-text dark:text-text-dark mb-2"
          >
            {t("footer.priority")}:
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-border dark:border-border-dark bg-background dark:bg-background-dark text-text dark:text-text-dark rounded-md shadow-sm focus:ring-2 focus:ring-primary hover:border-primary dark:hover:border-primary-dark focus:outline-none"
          >
            <option value="Low">{t("footer.low")}</option>
            <option value="Average">{t("footer.average")}</option>
            <option value="High">{t("footer.high")}</option>
          </select>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => dialog.current.close()}
            className="px-4 py-2 bg-secondary hover:bg-secondary-light text-white rounded-md transition-colors"
          >
            {t("footer.cancel")}
          </button>
          <button
            type="button"
            onClick={(e) => createTicket(e)}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
          >
            {t("footer.submit")}
          </button>
        </div>
      </dialog>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Daniil Pak. All rights reserved.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-row justify-center items-center">
            <img className="h-8 inline" src={telegram} />
            <a
              href="https://t.me/sanvxzl"
              className="text-primary-light hover:text-primary-DEFAULT transition-colors duration-300"
            >
              @sanvxzl
            </a>
          </div>
          <div>
            <a href="https://www.itransition.com/">
              <img className="h-6 inline" src={itr} />
            </a>
          </div>
          <button onClick={() => dialog.current.showModal()}>
            Send a ticket
          </button>
        </div>
      </div>
    </div>
  );
}
