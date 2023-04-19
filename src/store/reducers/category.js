import {
  CREATE,
  FETCH_BY,
  UPDATE,
  DELETE,
  FETCH_ALL_CATEGORY,
} from "../../constants/actionTypes";

const initialState = { dataCategoryReducer: [] };

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
      };
    case FETCH_ALL_CATEGORY:
      return {
        ...state,
        dataCategoryReducer: action.payload,
      };
    case FETCH_BY:
      return {
        ...state,
        dataCategoryReducer: action.payload,
      };
    case UPDATE:
      return {
        ...state,
      };
    case DELETE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default categoryReducer;
