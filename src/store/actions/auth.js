import { AUTH, } from "../../constants/actionTypes";
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
  console.log("interceptornye===>>", req);
  req.headers = headers;
  return req;
});


export const signin = (formData, successCB, failedCB) => async (dispatch) => {
  API.post("/v1/auth/signin", formData)
    .then((response) => {
      const result = response.data.result;
      const token = response.data.token;
      const data = {
        result,
        token,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};

export const signup = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("firstName", formData.firstName);
  data.append("lastName", formData.lastName);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("coordinatUser", formData.coordinatUser);
  data.append("file", formData.file);
  API.post("/v1/auth/signup", data)
    .then((response) => {
      return successCB && successCB(response);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};

export const signOut = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("email", formData);
  API.post("/v1/auth/signOut", data)
    .then((response) => {
      return successCB && successCB(response);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};