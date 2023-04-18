import API from "configs/axios";
import { FETCH_USER, } from "../../constants/actionTypes";


export const getUser = (currentId, successCB, failedCB) => async (dispatch) => {
  API.get(`/admin/account/${currentId}`)
    .then((response) => {
      const resAPI = response.data;
      dispatch({ type: FETCH_USER, payload: resAPI });
      return successCB && successCB(resAPI);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};
export const deleteUser = (currentId,) => async () => {
  try {
    const { data } = API.delete(`/admin/account/${currentId}`)
    return data;
  } catch (error) {
    throw new Error(error);
  }
};