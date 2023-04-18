import {
  CREATE,
  FETCH_ALL,
  FETCH_BY,
  UPDATE,
  DELETE,
} from "../../constants/actionTypes";

const initialState = { dataCategoryReducer: [] };

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
      };
    case FETCH_ALL:
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
