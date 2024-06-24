import { useContext } from "react";
import { CustomerContext } from "../contexts/customerContext";

export default function UseCustomer() {
    return useContext(CustomerContext);
}