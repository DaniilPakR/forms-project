import { useContext, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"

import { GlobalContext } from "../context/GlobalProvider"
import AdminToolbar from "../components/AdminToolbar"

export default function AdminPage() {
  const navigate = useNavigate();

  const { currentUser, isAdmin } = useContext(GlobalContext)

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate("/")
    }
  }, [currentUser, isAdmin ])

  return (
    <div className="mt-16">
      {currentUser && <AdminToolbar />}
    </div>
  )
}