import { USER_ACTION_TYPES } from "./user.types";
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SET_USER_DATA:
      return {
        ...state,
        ...payload,
      };
    case USER_ACTION_TYPES.SET_USER_NAME:
      return {
        ...state,
        userUsername: payload,
      };
    case USER_ACTION_TYPES.SET_USER_IMAGE_URL:
      return {
        ...state,
        userImageUrl: payload,
      };

    default:
      return state;
  }
};

const INITIAL_STATE = {
  currentUser: null,
  userUsername: "",
  userImageUrl: "",
  userEmail: "",
  userCreated: new Date(),
};
