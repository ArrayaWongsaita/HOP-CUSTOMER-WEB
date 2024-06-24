import { useNavigate } from "react-router-dom";

import UseCustomer from "../hooks/customerHook";

export default function ProtectedRoute({ children }) {
    const { customerUser, isCustomerUserLoading } = UseCustomer();

    const navigate = useNavigate()

    if (!customerUser && !isCustomerUserLoading) {
        return navigate('/auth/register');
    }
    return (
        <>
            {isCustomerUserLoading && <h1>Loading CustomerUserLoading</h1>}
            {children}
        </>
    )
}