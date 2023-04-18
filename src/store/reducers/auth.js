import { AUTH, LOGOUT, FETCH_MENU, STATE_LOCATION } from "../../constants/actionTypes";

const authReducer = (state = { authData: null, userMenu: [], stateLocation: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    case FETCH_MENU:
      return { ...state, userMenu: action.payload };

    case STATE_LOCATION:
      return { ...state, stateLocation: action.payload };

    default:
      return state;
  }
};

export default authReducer;
