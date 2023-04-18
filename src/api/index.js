import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_HOST });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const fetchUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, updateUser) =>
  API.patch(`/users/${id}`, updateUser);

export const signIn = (formData) => API.post("/v1/auth/signin", formData);
export const signUp = (formData) => API.post("/v1/auth/signup", formData);
