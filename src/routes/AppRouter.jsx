import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import RegisterAndLoginPage from "../pages/registerAndLogin-page";
import MainContainer from "../layouts/mainContainer";
import HomePage from "../pages/home-page";
// import ProtectedRoute from "../features/protectedRoute";

const router = createBrowserRouter([
    { path: '/auth/register', element: <div className="w-lvw h-lvh bg-black flex justify-center"><RegisterAndLoginPage /></div> },
    {
        path: '/', element: (
            // <ProtectedRoute>
                <MainContainer />
            // </ProtectedRoute>
        ),
        children: [
            { path: '/', element: <HomePage /> }
        ]
    }
])

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}