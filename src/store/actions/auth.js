import { AUTH, FETCH_POSTS_GIT, FETCH_USERS_GIT, FETCH_MENU, STATE_LOCATION, } from "../../constants/actionTypes";
import axios from "axios";
import env from "configs/vars";
const API = axios.create({ baseURL: process.env.REACT_APP_HOST });
const APIMEMORIES = axios.create({ baseURL: env.reactAppHostMemories });

const APIGITHUB = axios.create({ baseURL: env.reactAppHostGithub });
APIGITHUB.interceptors.request.use((req) => {
  req.headers.Authorization = `Token ${env.reactAppHostGithubToken}`;
  return req;
});

export const stateLocation =
  (data) => async (dispatch) => {
    try {
      dispatch({
        type: STATE_LOCATION,
        payload: data
      });
    } catch (error) {
      console.log("error signin", error);
    }
  };

export const getPrivateImageUsers =
  (successCB, failedCB) => async (dispatch) => {
    APIGITHUB.get(`/contents/public/images/users?ref=main`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: FETCH_USERS_GIT, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };

export const getPrivateImagePosts =
  (successCB, failedCB) => async (dispatch) => {
    APIGITHUB.get(`/contents/public/images/posts?ref=main`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: FETCH_POSTS_GIT, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };

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

export const changepassword = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("email", formData.email);
  data.append("oldPassword", formData.oldPassword);
  data.append("password", formData.password);
  API.post("/v1/auth/changepassword", data)
    .then((response) => {
      const token = response.data.token;
      const foto = response.data.foto;
      const data = {
        token,
        foto,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};

export const resetPassword = (formData, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("email", formData.email);
  API.post("/v1/auth/resetPassword", data)
    .then((response) => {
      const token = response.data.token;
      const foto = response.data.foto;
      const data = {
        token,
        foto,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};

export const createNewPassword = (formData, { token }, successCB, failedCB) => async (dispatch) => {
  const data = new FormData();
  data.append("password", formData.password);
  API.post(`/v1/auth/createNewPassword/${token}`, data)
    .then((response) => {
      const token = response.data.token;
      const foto = response.data.foto;
      const data = {
        token,
        foto,
      };
      dispatch({ type: AUTH, data });
      return successCB && successCB(response);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};

export const getMenu =
  (successCB, failedCB) => async (dispatch) => {
    APIMEMORIES.get('/user/menu')
      .then((response) => {
        const resAPI = response.data.data;
        dispatch({ type: FETCH_MENU, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return failedCB && failedCB(err);
      });
  };