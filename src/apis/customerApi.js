import axios from "../configs/axios";

const customerApi = {};

customerApi.register = (body) => axios.post("/auth/register/customer", body);
customerApi.login = (body) => axios.post("/auth/login/customer", body);
customerApi.getCustomerUser = () => axios.get("/auth/me");
customerApi.checkCustomerRoute = () => axios.get("/customer/route");

export default customerApi;
