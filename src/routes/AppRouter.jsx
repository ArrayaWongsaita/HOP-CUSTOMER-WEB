import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RegisterAndLoginPage from "../pages/registerAndLogin-page";

const router = createBrowserRouter([
    { path: '/auth/register', element: <div className="w-lvw h-lvh bg-black flex justify-center"><RegisterAndLoginPage /></div> }
])

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}