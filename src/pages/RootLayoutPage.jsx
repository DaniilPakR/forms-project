import { Outlet } from "react-router-dom"
import { useContext } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { GlobalContext } from "../context/GlobalProvider"
import Navbar from "../components/Navbar"

export default function RootLayoutPage() {

  const { languageInitialized } = useContext(GlobalContext);

  if (!languageInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </>
  )
}