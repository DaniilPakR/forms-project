import { createBrowserRouter, RouterProvider } from "react-router-dom"


import GlobalContextProvider from "./context/GlobalProvider"
import HomePage from "./pages/HomePage"
import RootLayoutPage from "./pages/RootLayoutPage"

const router = createBrowserRouter([
  {path: '/', element: <RootLayoutPage />, children: [
    {index: true, element: <HomePage />},
  ]}
])

export default function App() {
  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  )
}