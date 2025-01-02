import { Link } from "react-router-dom";
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";

export default function SuccessPage() {

  const { t } = useContext(GlobalContext);

  return (
    <div className="flex flex-col items-center mt-16">
      <div
        style={{
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(30, 58, 138, 0.15)`,
        }}
        className="text-center w-full max-w-3xl border bg-white dark:bg-gray-800 rounded-lg p-6 gap-6 flex flex-col"
      >
        <p>{t("successPage.successMessage")}</p>
        <Link
          to="/"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 lg:px-6 lg:py-3"
        >
          {t("successPage.goHome")}
        </Link>
      </div>
    </div>
  );
}
