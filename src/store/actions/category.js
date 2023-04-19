import API from "configs/axios";
import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  FETCH_BY,
  DELETE,
  FETCH_ALL_CATEGORY,
} from "../../constants/actionTypes";

export const createCategory =
  (formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("name", formData.name);
    API.post("/admin/category", data)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: CREATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        console.log("err reducer==", err);
        return dispatch(failedCB && failedCB(err));
      });
  };

export const getAllCategories = (successCB, failedCB) => async (dispatch) => {
  API.get("/admin/category")
    .then((response) => {
      const resAPI = response.data.category;
      dispatch({ type: FETCH_ALL_CATEGORY, payload: resAPI });
      return successCB && successCB(resAPI);
    })
    .catch((err) => {
      console.log("err reducer==", err);
      return dispatch(failedCB && failedCB(err));
    });
};

export const getCategory =
  (currentId, successCB, failedCB) => async (dispatch) => {
    API.get(`/admin/categoryById/${currentId}`)
      .then((response) => {
        const resAPI = response.data.category;
        dispatch({ type: FETCH_BY, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        console.log("err reducer==", err);
        return dispatch(failedCB && failedCB(err));
      });
  };

export const updateCategory =
  (formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("_id", formData._id);
    data.append("name", formData.name);
    API.put("/admin/category", data)
      .then((response) => {
        const resAPI = response.data;
        console.log("resAPI", resAPI);
        dispatch({ type: UPDATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {
        return dispatch(failedCB && failedCB(err));
      });
  };

export const delCategory = (id, successCB, failedCB) => async (dispatch) => {
  API.delete("/admin/category/" + id)
    .then((response) => {
      const resAPI = response.data;
      dispatch({ type: DELETE, payload: resAPI });
      return successCB && successCB(resAPI);
    })
    .catch((err) => {
      return dispatch(failedCB && failedCB(err));
    });
};
