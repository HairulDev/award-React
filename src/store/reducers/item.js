import {
  CREATE,
  FETCH_ALL,
  FETCH_BY,
  UPDATE,
  DELETE,
  FETCH_ALL_ITEM,
  SAVE_FILTER,
} from "../../constants/actionTypes";

const initialState = { dataItemReducerAll: [], dataItemReducer: [], filterHistory: [], };

const itemReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE:
      return {
        ...state,
      };
    case FETCH_ALL_ITEM:
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

    case SAVE_FILTER:
      return { ...state, filterHistory: action.payload };

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
export default itemReducer;
