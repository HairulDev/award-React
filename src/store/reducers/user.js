import {
  UPDATE,
  DELETE,
  FETCH_USER,
  FETCH_USERS,
} from "../../constants/actionTypes";

const initialState = { dataUsers: [], dataUser: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_USERS:
      return {
        ...state,
        dataUsers: action.payload,
      };
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
