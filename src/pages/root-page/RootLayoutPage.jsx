import { Outlet } from "react-router-dom";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { GlobalContext } from "../../context/GlobalProvider";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import styles from "./RootLayoutPage.module.css";

export default function RootLayoutPage() {
  const { languageInitialized } = useContext(GlobalContext);

  if (!languageInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.rootLayout}>
      <Navbar />
      <ToastContainer />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
