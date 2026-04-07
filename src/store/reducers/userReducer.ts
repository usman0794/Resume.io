import * as T from '@/constants/actionTypes';
import type { UserState } from '@/types/user.types';

const initialState: UserState = {
  user: null,
  isLoggedIn: !!localStorage.getItem('token'),
  loading: false,
  status: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case T.LOGIN_SUCCESS:
    case T.SIMPLE_USER_LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, user: action.data, status: action.type };
    case T.LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, user: null, status: T.LOGIN_FAILURE };
    case T.SIGNUP_SUCCESS:
    case T.SIMPLE_USER_REGISTER_SUCCESS:
      return { ...state, isLoggedIn: true, user: action.data, status: action.type };
    case T.SIGNUP_FAILURE:
      return { ...state, isLoggedIn: false, user: null, status: T.SIGNUP_FAILURE };
    case T.AUTHENTICATE_USER_SUCCESS:
      return { ...state, isLoggedIn: true, user: action.data, status: T.AUTHENTICATE_USER_SUCCESS };
    case T.AUTHENTICATE_USER_FAILURE:
      return { ...state, isLoggedIn: false, user: null, status: T.AUTHENTICATE_USER_FAILURE };
    case T.LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false, user: null, status: T.LOGOUT_SUCCESS };
    case T.START_LOADING:
      return { ...state, loading: true };
    case T.STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userReducer;
