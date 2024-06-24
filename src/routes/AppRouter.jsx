import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RegisterAndLoginPage from "../Pages/RegisterAndLogin-page";
import MainContainer from "../layouts/mainContainer";
import Homepage from "../Pages/Homepage";

// import ProtectedRoute from "../features/protectedRoute";

const router = createBrowserRouter([
  {
    path: "/auth/register",
    element: (
      <div className="w-lvw h-lvh bg-black flex justify-center">
        <RegisterAndLoginPage />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <MainContainer />
      // </ProtectedRoute>
    ),
    children: [{ path: "/", element: <Homepage /> }],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
