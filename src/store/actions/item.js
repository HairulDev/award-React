import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  FETCH_BY,
  DELETE,
  LIKE,
  COMMENT,
} from "../../constants/actionTypes";

import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_HOST });
const user = JSON.parse(localStorage.getItem('profile'));
API.interceptors.request.use((req) => {
  req.headers.authorization = `Bearer ${user.token}`;
  return req;
});


export const likeItem = (id) => async (dispatch) => {
  try {
    const { data } = await API.put(`/admin/item/${id}/likeItem`);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const commentItem = (value, id) => async (dispatch) => {
  try {
    const { data } = await API.post(`/admin/item/${id}/commentItem`, { value });
    console.log("data==", data);
    dispatch({ type: COMMENT, payload: data });
    return data.item.comments;
  } catch (error) {
    console.log(error);
  }
};

export const createItem =
  (formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("city", formData.city);
    data.append("categoryId", formData.categoryId);
    data.append("file", formData.file);
    data.append("description", formData.description);
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

export const getItemBySearch = (type, value, successCB, failedCB) => async (dispatch) => {

  console.log("getItemBySearch value", value);
  API.get(`/admin/getItemBySearch?type=${type}&maxPrice=${value}`)
    .then((response) => {
      const resAPI = response.data;
      dispatch({
        type: FETCH_ALL,
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
        type: FETCH_ALL,
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

export const getItemImage =
  (currentId, successCB, failedCB) => async (dispatch) => {
    API.get(`/admin/item/show-image/${currentId}`)
      .then((response) => {
        const resAPI = response.data.item.imageId;
        dispatch({ type: FETCH_BY, payload: resAPI });
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
    data.append("city", formData.city);
    data.append("categoryId", formData.categoryId);
    data.append("file", formData.file);
    data.append("description", formData.description);
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

export const viewDetailItem =
  (currentId, successCB, failedCB) => async (dispatch) => {
    API.get(`/admin/item/show-detail-item/${currentId}`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: FETCH_ALL, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const createFeatureItem =
  (currentId, formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("itemId", currentId);
    data.append("name", formData.name);
    data.append("qty", formData.qty);
    data.append("file", formData.file);
    API.post("/admin/item/add/feature", data)
      .then((response) => {
        const resAPI = response.data;
        console.log("resAPI response", resAPI);
        dispatch({ type: CREATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const showEditFeature =
  (showEditFeature, successCB, failedCB) => async (dispatch) => {
    API.get(`/admin/item/showEditFeature/${showEditFeature}`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: FETCH_BY, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const updateFeatureItem =
  (formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("id", formData._id);
    data.append("itemId", formData.itemId);
    data.append("name", formData.name);
    data.append("qty", formData.qty);
    data.append("file", formData.file);
    API.put("/admin/item/update/feature", data)
      .then((response) => {
        const resAPI = response.data;
        console.log("resAPI updateDetailItem ", resAPI);
        dispatch({ type: UPDATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const delFeatureItem =
  (itemId, id, successCB, failedCB) => async (dispatch) => {
    API.delete(`/admin/item/${itemId}/feature/${id}`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: DELETE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const createActivityItem =
  (currentId, formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("itemId", currentId);
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("file", formData.file);
    API.post("/admin/item/add/activity", data)
      .then((response) => {
        const resAPI = response.data;
        console.log("resAPI response", resAPI);
        dispatch({ type: CREATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const showEditActivity =
  (showEditActivity, successCB, failedCB) => async (dispatch) => {
    API.get(`/admin/item/showEditActivity/${showEditActivity}`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: FETCH_BY, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const updateActivityItem =
  (formData, successCB, failedCB) => async (dispatch) => {
    const data = new FormData();
    data.append("id", formData._id);
    data.append("itemId", formData.itemId);
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("file", formData.file);
    API.put("/admin/item/update/activity", data)
      .then((response) => {
        const resAPI = response.data;
        console.log("resAPI updateDetailItem ", resAPI);
        dispatch({ type: UPDATE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };

export const delActivityItem =
  (itemId, id, successCB, failedCB) => async (dispatch) => {
    API.delete(`/admin/item/${itemId}/activity/${id}`)
      .then((response) => {
        const resAPI = response.data;
        dispatch({ type: DELETE, payload: resAPI });
        return successCB && successCB(resAPI);
      })
      .catch((err) => {

        return failedCB && failedCB(err);
      });
  };
