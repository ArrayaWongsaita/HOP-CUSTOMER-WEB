import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"

import customerApi from "../apis/customerApi";
import { setAccessToken, getAccessToken, removeAccessToken } from "../utils/local-storage";

export const CustomerContext = createContext();

export default function CustomerContextProvider({ children }) {
    const [customerUser, setCustomerUser] = useState(null)

    useEffect(() => {
        customerLogin();
    }, []);
    
    const customerLogin = async () => {
        try {
            if (getAccessToken()) {
                const res = await customerApi.getCustomerUser();
                setCustomerUser(res.data.user);
            }
        }   catch (err) {
            console.log(err);
        }
    };
    
    const login = async credentials => {
        const res = await customerApi.login(credentials);
        setAccessToken(res.data.accessToken);
        const resGetCustomerUser = await customerApi.getCustomerUser();
        setCustomerUser(resGetCustomerUser.data.user);
    };

    const logout = () => {
        removeAccessToken();
        setCustomerUser(null);
    };
    
    return (
        <CustomerContext.Provider
        value={{ customerUser, login, logout }}
        >
            {children}
        </CustomerContext.Provider>
    )
}