import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RegisterAndLoginPage from "../pages/RegisterAndLoginPage";
import MainContainer from "../layouts/MainContainer";
import Homepage from "../pages/Homepage";
import ChatContainer from "../features/chat/components/ChatContainer";
import ProfileSetting from "../pages/ProfileSetting";
import UserOrder from "../pages/UserOrder";
import SocketIoContextProvider from "../contexts/SocketIoContext";
// import ProtectedRoute from "../features/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/auth/login",
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
      <SocketIoContextProvider>
        <MainContainer />
      </SocketIoContextProvider>
      // </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Homepage /> },
      // { path: "/route/:routeId", element: <UserOrder /> },
      { path: "/route/:routeId", element: <UserOrder /> },
      { path: "/chat/admin", element: <ChatContainer chatWith="Admin" /> },
      { path: "/chat/rider", element: <ChatContainer /> },
      { path: "/55466", element: <ProfileSetting /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
