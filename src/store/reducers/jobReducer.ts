import * as T from '@/constants/actionTypes';
import type { JobState } from '@/types/job.types';

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobReducer = (state = initialState, action: any): JobState => {
  switch (action.type) {
    case T.FETCH_JOBS_REQUEST:
    case T.CREATE_JOB_REQUEST:
    case T.UPDATE_JOB_REQUEST:
    case T.DELETE_JOB_REQUEST:
      return { ...state, loading: true, error: null };

    case T.FETCH_JOBS_SUCCESS:
      return { ...state, loading: false, jobs: action.payload };
    case T.CREATE_JOB_SUCCESS:
      return { ...state, loading: false, jobs: [action.payload, ...state.jobs] };
    case T.UPDATE_JOB_SUCCESS:
      return { ...state, loading: false, jobs: state.jobs.map(j => j.id === action.payload.id ? action.payload : j) };
    case T.DELETE_JOB_SUCCESS:
      return { ...state, loading: false, jobs: state.jobs.filter(j => j.id !== action.payload) };

    case T.FETCH_JOBS_FAILURE:
    case T.CREATE_JOB_FAILURE:
    case T.UPDATE_JOB_FAILURE:
    case T.DELETE_JOB_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default jobReducer;
