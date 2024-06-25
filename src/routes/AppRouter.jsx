import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RegisterAndLoginPage from "../pages/RegisterAndLoginPage";
import MainContainer from "../layouts/MainContainer";
import Homepage from "../pages/Homepage";
import ChatContainer from "../features/chat/components/ChatContainer";
import ProfileSetting from "../pages/ProfileSetting";
import ProtectedRoute from "../features/ProtectedRoute";

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
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/chat/admin", element: <ChatContainer chatWith="Admin" /> },
      { path: "/chat/rider", element: <ChatContainer /> },
      { path: "/55466", element: <ProfileSetting /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
