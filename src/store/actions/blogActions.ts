import type { AppDispatch } from "@/store";
import type { Dispatch } from 'redux';
import blogService from '@/services/blogService';
import * as T from '@/constants/actionTypes';

export const fetchBlogs = (page = 1, perPage = 10) => async (dispatch: Dispatch) => {
  dispatch({ type: T.FETCH_BLOGS_START });
  try {
    const result = await blogService.getBlogs(page, perPage);
    dispatch({ type: T.FETCH_BLOGS_SUCCESS, payload: result });
    return { success: true };
  } catch (err: any) {
    const msg = err.message ?? 'Failed to fetch blogs';
    dispatch({ type: T.FETCH_BLOGS_ERROR, payload: msg });
    return { success: false, message: msg };
  }
};

export const fetchBlogBySlug = (slug: string) => async (dispatch: Dispatch) => {
  dispatch({ type: T.FETCH_BLOG_BY_SLUG_START });
  try {
    const data = await blogService.getBlogBySlug(slug);
    dispatch({ type: T.FETCH_BLOG_BY_SLUG_SUCCESS, payload: data });
    return { success: true };
  } catch (err: any) {
    const msg = err.message ?? 'Failed to fetch article';
    dispatch({ type: T.FETCH_BLOG_BY_SLUG_ERROR, payload: msg });
    return { success: false, message: msg };
  }
};

export const fetchBlogById = (id: number | string) => async (dispatch: Dispatch) => {
  dispatch({ type: T.FETCH_BLOG_BY_ID_START });
  try {
    const data = await blogService.getBlogById(id);
    dispatch({ type: T.FETCH_BLOG_BY_ID_SUCCESS, payload: data });
    return { success: true, data };
  } catch (err: any) {
    const msg = err.message ?? 'Failed to fetch blog';
    dispatch({ type: T.FETCH_BLOG_BY_ID_ERROR, payload: msg });
    return { success: false, message: msg };
  }
};

export const createBlog = (formData: FormData) => async (dispatch: Dispatch) => {
  dispatch({ type: T.CREATE_BLOG_START });
  try {
    const result = await blogService.createBlog(formData);
    dispatch({ type: T.CREATE_BLOG_SUCCESS, payload: result.data });
    return { success: true, message: result.message };
  } catch (err: any) {
    const data = err.response?.data;
    dispatch({ type: T.CREATE_BLOG_ERROR, payload: err.message });
    return { success: false, message: data?.message ?? err.message, errors: data?.errors };
  }
};

export const updateBlog = (id: number | string, formData: FormData) => async (dispatch: Dispatch) => {
  dispatch({ type: T.UPDATE_BLOG_START });
  try {
    const result = await blogService.updateBlog(id, formData);
    dispatch({ type: T.UPDATE_BLOG_SUCCESS, payload: result.data });
    return { success: true, message: result.message };
  } catch (err: any) {
    const data = err.response?.data;
    dispatch({ type: T.UPDATE_BLOG_ERROR, payload: err.message });
    return { success: false, message: data?.message ?? err.message, errors: data?.errors };
  }
};

export const deleteBlog = (id: number | string) => async (dispatch: Dispatch) => {
  dispatch({ type: T.DELETE_BLOG_START });
  try {
    const result = await blogService.deleteBlog(id);
    dispatch({ type: T.DELETE_BLOG_SUCCESS, payload: String(id) });
    (dispatch as AppDispatch)(fetchBlogs(1, 50));
    return { success: true, message: result.message };
  } catch (err: any) {
    dispatch({ type: T.DELETE_BLOG_ERROR, payload: err.message });
    return { success: false, message: err.message };
  }
};
