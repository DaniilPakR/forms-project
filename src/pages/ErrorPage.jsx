import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";

export default function ErrorPage() {

  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="text-center mt-32 text-2xl">
        <h1>{t("error.pageDoesntExist")}</h1>
      </div>
    </>
  );
}
