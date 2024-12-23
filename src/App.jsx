import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n";

import GlobalContextProvider from "./context/GlobalProvider";
import HomePage from "./pages/HomePage";
import RootLayoutPage from "./pages/RootLayoutPage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import FormCreationPage from "./pages/FormCreationPage";
import FormEditingPage from "./pages/FormEditingPage";
import FillFormPage from "./pages/FillFormPage";
import AdminPage from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/auth", element: <AuthPage />, action: authAction },
      { path: "/cform/:id", element: <FormCreationPage /> },
      { path: "/eform/:id", element: <FormEditingPage /> },
      { path: "/fform/:id", element: <FillFormPage /> },
      { path: "/admin", element: <AdminPage /> }
    ],
    errorElement: <ErrorPage />
  },
]);

export default function App() {
  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  );
}
