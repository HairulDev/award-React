import {
  UPDATE,
  DELETE,
  FETCH_USER,
} from "../../constants/actionTypes";

const initialState = { dataUser: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_USER:
      return {
        ...state,
        dataUser: action.payload,
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
export default userReducer;
