import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./translation/i18n";

import GlobalContextProvider from "./context/GlobalProvider";
import HomePage from "./pages/HomePage";
import RootLayoutPage from "./pages/root-page/RootLayoutPage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import FormCreationPage from "./pages/FormCreationPage";
import FormEditingPage from "./pages/FormEditingPage";
import FillFormPage from "./pages/FillFormPage";
import AdminPage from "./pages/AdminPage";
import ViewFormPage from "./pages/ViewFormPage";
import SuccessPage from "./pages/SucessPage";

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
      { path: "/admin", element: <AdminPage /> },
      { path: "/vform/:id", element: <ViewFormPage /> },
      { path: "/success", element: <SuccessPage /> },
    ],
  },
]);

export default function App() {
  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  );
}
