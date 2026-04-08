import type { Dispatch } from 'redux';
import authService from '@/services/authService';
import {
  LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  START_LOADING, STOP_LOADING,
  SIGNUP_SUCCESS, SIGNUP_FAILURE,
  AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
} from '@/constants/actionTypes';

export const loginUser = (credentials: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { user } = await authService.login(credentials);
      dispatch({ type: LOGIN_SUCCESS, data: user });
      return { success: true, user };
    } catch (err: any) {
      const data = err.response?.data;
      dispatch({ type: LOGIN_FAILURE });
      return { success: false, message: data?.message ?? 'Login failed.', errors: data?.errors ?? null };
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

export const registerUser = (userData: { name: string; email: string; password: string; password_confirmation: string }) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { user } = await authService.register(userData);
      dispatch({ type: SIGNUP_SUCCESS, data: user });
      return { success: true, user };
    } catch (err: any) {
      const data = err.response?.data;
      dispatch({ type: SIGNUP_FAILURE });
      return { success: false, message: data?.message ?? 'Registration failed.', errors: data?.errors ?? null };
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

export const socialLogin = (idToken: string, provider: string) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { user } = await authService.socialLogin(idToken, provider);
      dispatch({ type: LOGIN_SUCCESS, data: user });
      return { success: true, user };
    } catch (err: any) {
      const data = err.response?.data;
      dispatch({ type: LOGIN_FAILURE });
      return { success: false, message: data?.message ?? 'Social login failed.', errors: data?.errors ?? null };
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

export const authenticateUser = () =>
  async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const user = await authService.me();
      dispatch({ type: AUTHENTICATE_USER_SUCCESS, data: user });
      return { success: true };
    } catch {
      dispatch({ type: AUTHENTICATE_USER_FAILURE });
      return { success: false };
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

export const logoutUser = () =>
  async (dispatch: Dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      await authService.logout();
    } finally {
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch({ type: STOP_LOADING });
    }
  };
