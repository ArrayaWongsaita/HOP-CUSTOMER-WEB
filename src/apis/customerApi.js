import axios from "../configs/axios";

const customerApi = {};

customerApi.register = body => axios.post('', body);
customerApi.login = body => axios.post('', body);
customerApi.getCustomerUser = () => axios.get('');

export default customerApi;