import type { Dispatch } from 'redux';
import jobService from '@/services/jobService';
import * as T from '@/constants/actionTypes';
import type { Job } from '@/types/job.types';

export const fetchJobs = () => async (dispatch: Dispatch) => {
  dispatch({ type: T.FETCH_JOBS_REQUEST });
  try {
    const data = await jobService.getJobs();
    dispatch({ type: T.FETCH_JOBS_SUCCESS, payload: data });
  } catch (err: any) {
    dispatch({ type: T.FETCH_JOBS_FAILURE, payload: err.message });
  }
};

export const fetchJobById = (id: number | string) => async () => {
  try {
    const data = await jobService.getJobById(id);
    return { success: true, data };
  } catch (err: any) {
    return { success: false, message: err.response?.data?.message ?? 'Failed to fetch job.' };
  }
};

export const createJob = (jobData: Partial<Job>) => async (dispatch: Dispatch) => {
  dispatch({ type: T.CREATE_JOB_REQUEST });
  try {
    const result = await jobService.createJob(jobData);
    dispatch({ type: T.CREATE_JOB_SUCCESS, payload: result.data });
    return { success: true, message: result.message };
  } catch (err: any) {
    dispatch({ type: T.CREATE_JOB_FAILURE });
    return { success: false, message: err.response?.data?.message ?? 'Failed to create job.', errors: err.response?.data?.errors };
  }
};

export const updateJob = (id: number | string, jobData: Partial<Job>) => async (dispatch: Dispatch) => {
  dispatch({ type: T.UPDATE_JOB_REQUEST });
  try {
    const result = await jobService.updateJob(id, jobData);
    dispatch({ type: T.UPDATE_JOB_SUCCESS, payload: result.data });
    return { success: true, message: result.message };
  } catch (err: any) {
    dispatch({ type: T.UPDATE_JOB_FAILURE });
    return { success: false, message: err.response?.data?.message ?? 'Failed to update job.', errors: err.response?.data?.errors };
  }
};

export const deleteJob = (id: number | string) => async (dispatch: Dispatch) => {
  dispatch({ type: T.DELETE_JOB_REQUEST });
  try {
    const result = await jobService.deleteJob(id);
    dispatch({ type: T.DELETE_JOB_SUCCESS, payload: id });
    return { success: true, message: result.message };
  } catch (err: any) {
    dispatch({ type: T.DELETE_JOB_FAILURE });
    return { success: false, message: err.message };
  }
};
