import axios from "axios";
import env from "configs/vars";

const API = axios.create({ baseURL: env.reactAppHost });
const user = JSON.parse(localStorage.getItem('profile'));
API.interceptors.request.use((req) => {
  req.headers.authorization = `Bearer ${user.token}`;
  return req;
});

export default API;