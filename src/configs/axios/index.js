import axios from "axios";
import env from "configs/vars";

const API = axios.create({ baseURL: env.reactAppHost });
const user = JSON.parse(localStorage.getItem('profile'));

const headers = {
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${user?.token ?? ''}`,
  'Content-Type': 'application/json',
  'x-api-key': env.apiKey,
};

API.interceptors.request.use((req) => {
  req.headers = headers;
  return req;
});


export default API;