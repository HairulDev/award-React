import {
  CREATE,
  FETCH_ALL,
  FETCH_BY,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
} from "../../constants/actionTypes";

const initialState = { dataItemReducerAll: [], dataItemReducer: [] };

const itemReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE:
      return {
        ...state,
      };
    case FETCH_ALL:
      return {
        ...state,
        dataItemReducerAll: {
          item: action.payload.item,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        },
      };
    case FETCH_BY:
      return {
        ...state,
        dataItemReducer: {
          item: action.payload.item,
        },
      };
    case UPDATE:
      return {
        ...state,
      };
    case DELETE:
      return {
        ...state,
      };

    case LIKE:
      return {
        ...state,
        dataItemReducer: action.payload,
      };

    case COMMENT:
      return {
        ...state,
        dataItemReducer: action.payload,
      };

    default:
      return state;
  }
};
export default itemReducer;
