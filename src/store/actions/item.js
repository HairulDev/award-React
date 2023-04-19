import API from "configs/axios";
import {
  CREATE,
  UPDATE,
  FETCH_BY,
  DELETE,
  FETCH_ALL_ITEM,
  SAVE_FILTER,
} from "../../constants/actionTypes";


export const filterHistorySave =
  (value, checkboxStates) => async (dispatch) => {
    try {
      const data = { value, checkboxStates };
      console.log("data filterHistorySave===>>", data);
      dispatch({
        type: SAVE_FILTER,
        payload: data
      });
    } catch (error) {
      console.log("error", error);
    }
  };

export const createItem =
  (formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("categoryId", formData.categoryId);
    data.append("file", formData.file);
    API.post("/admin/item", data)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: CREATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };


export const updateItem =
  (currentId, formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("categoryId", formData.categoryId);
    data.append("file", formData.file);
    API.put(`/admin/item/${currentId}`, data)
      .then((response) => {
        const resAPI = response.data;
        console.log("resAPI", resAPI);
        dispatch({ type: UPDATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };


export const getItemBySearch = (type, value, successCB, failedCB) => async (dispatch) => {
  API.get(`/admin/getItemBySearch?type=${type}&maxPrice=${value}`)
    .then((response) => {
      const resAPI = response.data;
      dispatch({
        type: FETCH_ALL_ITEM,
        payload: {
          item: resAPI.item,
        }
      });
      return successCB && successCB(resAPI);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};

export const getAllItem = (page, successCB, failedCB) => async (dispatch) => {
  API.get(`/admin/item?page=${page}`)
    .then((response) => {
      const resAPI = response.data;
      dispatch({
        type: FETCH_ALL_ITEM,
        payload: {
          item: resAPI.item,
          currentPage: resAPI.currentPage,
          numberOfPages: resAPI.numberOfPages,
        }
      });
      return successCB && successCB(resAPI);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};

export const getItem = (currentId, successCB, failedCB) => async (dispatch) => {
  API.get(`/admin/item/${currentId}`)
    .then((response) => {
      const resAPI = response.data;
      dispatch({ type: FETCH_BY, payload: resAPI });
      return successCB && successCB(resAPI);
    })
    .catch((err) => {
      return failedCB && failedCB(err);
    });
};


export const delItem = (id, successCB, failedCB) => async (dispatch) => {
  API.delete(`/admin/item/${id}/delete`)
    .then((response) => {
      const resAPI = response.data;
      dispatch({ type: DELETE, payload: resAPI });
      return successCB && successCB(resAPI);
    })
    .catch((err) => {

      return failedCB && failedCB(err);
    });
};