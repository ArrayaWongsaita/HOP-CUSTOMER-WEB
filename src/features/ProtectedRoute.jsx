import { useNavigate } from "react-router-dom";

import useCustomer from "../hooks/customerHook";

export default function ProtectedRoute({ children }) {
    const { customerUser, isCustomerUserLoading } = useCustomer();

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