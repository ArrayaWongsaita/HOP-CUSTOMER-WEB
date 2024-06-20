import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/register-page";

const router = createBrowserRouter([
    { path: '/auth/register', element: <RegisterPage /> }
])

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}