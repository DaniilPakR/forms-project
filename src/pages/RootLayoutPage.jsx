import { Outlet } from "react-router-dom"
import { useContext } from "react"

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
      <Outlet />
    </>
  )
}