import * as T from '@/constants/actionTypes';
import type { TemplateState } from '@/types/template.types';

const initialState: TemplateState = {
  templates: [],
  loading: false,
  error: null,
};

const templateReducer = (state = initialState, action: any): TemplateState => {
  switch (action.type) {
    case T.FETCH_TEMPLATES_REQUEST:
    case T.CREATE_TEMPLATE_REQUEST:
    case T.UPDATE_TEMPLATE_REQUEST:
    case T.DELETE_TEMPLATE_REQUEST:
      return { ...state, loading: true, error: null };

    case T.FETCH_TEMPLATES_SUCCESS:
      return { ...state, loading: false, templates: action.payload };
    case T.CREATE_TEMPLATE_SUCCESS:
      return { ...state, loading: false, templates: [action.payload, ...state.templates] };
    case T.UPDATE_TEMPLATE_SUCCESS:
      return { ...state, loading: false, templates: state.templates.map((t) => (t.id === action.payload.id ? action.payload : t)) };
    case T.DELETE_TEMPLATE_SUCCESS:
      return { ...state, loading: false, templates: state.templates.filter((t) => t.id !== action.payload) };

    case T.FETCH_TEMPLATES_FAILURE:
    case T.CREATE_TEMPLATE_FAILURE:
    case T.UPDATE_TEMPLATE_FAILURE:
    case T.DELETE_TEMPLATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default templateReducer;
