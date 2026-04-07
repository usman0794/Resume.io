import type { Dispatch } from 'redux';
import templateService from '@/services/templateService';
import * as T from '@/constants/actionTypes';

export const fetchPublicTemplates = () => async (dispatch: Dispatch) => {
  dispatch({ type: T.FETCH_TEMPLATES_REQUEST });
  try {
    const data = await templateService.getPublicTemplates();
    dispatch({ type: T.FETCH_TEMPLATES_SUCCESS, payload: data });
  } catch (err: any) {
    dispatch({ type: T.FETCH_TEMPLATES_FAILURE, payload: err.message });
  }
};

export const fetchAdminTemplates = () => async (dispatch: Dispatch) => {
  dispatch({ type: T.FETCH_TEMPLATES_REQUEST });
  try {
    const data = await templateService.getAdminTemplates();
    dispatch({ type: T.FETCH_TEMPLATES_SUCCESS, payload: data });
  } catch (err: any) {
    dispatch({ type: T.FETCH_TEMPLATES_FAILURE, payload: err.message });
  }
};

export const createTemplate = (formData: FormData) => async (dispatch: Dispatch) => {
  dispatch({ type: T.CREATE_TEMPLATE_REQUEST });
  try {
    const result = await templateService.createTemplate(formData);
    dispatch({ type: T.CREATE_TEMPLATE_SUCCESS, payload: result.data });
    return { success: true, message: result.message };
  } catch (err: any) {
    dispatch({ type: T.CREATE_TEMPLATE_FAILURE, payload: err.message });
    return { success: false, message: err.message };
  }
};

export const updateTemplate = (id: number | string, formData: FormData) => async (dispatch: Dispatch) => {
  dispatch({ type: T.UPDATE_TEMPLATE_REQUEST });
  try {
    const result = await templateService.updateTemplate(id, formData);
    dispatch({ type: T.UPDATE_TEMPLATE_SUCCESS, payload: result.data });
    return { success: true, message: result.message };
  } catch (err: any) {
    dispatch({ type: T.UPDATE_TEMPLATE_FAILURE, payload: err.message });
    return { success: false, message: err.message };
  }
};

export const deleteTemplate = (id: number | string) => async (dispatch: Dispatch) => {
  dispatch({ type: T.DELETE_TEMPLATE_REQUEST });
  try {
    const result = await templateService.deleteTemplate(id);
    dispatch({ type: T.DELETE_TEMPLATE_SUCCESS, payload: id });
    return { success: true, message: result.message };
  } catch (err: any) {
    dispatch({ type: T.DELETE_TEMPLATE_FAILURE, payload: err.message });
    return { success: false, message: err.message };
  }
};
