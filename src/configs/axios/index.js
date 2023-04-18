import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_HOST });
const user = JSON.parse(localStorage.getItem('profile'));
API.interceptors.request.use((req) => {
  req.headers.authorization = `Bearer ${user.token}`;
  return req;
});

export default API;