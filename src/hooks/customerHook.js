import { useContext } from "react";
import { CustomerContext } from "../contexts/CustomerContext";

export default function useCustomer() {
    return useContext(CustomerContext);
}