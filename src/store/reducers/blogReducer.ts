import * as T from '@/constants/actionTypes';
import type { BlogState } from '@/types/blog.types';

const initialState: BlogState = {
  blogs: [],
  selectedBlog: null,
  pagination: null,
  loading: false,
  error: null,
};

const blogReducer = (state = initialState, action: any): BlogState => {
  switch (action.type) {
    case T.FETCH_BLOGS_START:
    case T.FETCH_BLOG_BY_ID_START:
    case T.FETCH_BLOG_BY_SLUG_START:
    case T.CREATE_BLOG_START:
    case T.UPDATE_BLOG_START:
    case T.DELETE_BLOG_START:
      return { ...state, loading: true, error: null };

    case T.FETCH_BLOGS_SUCCESS:
      return { ...state, loading: false, blogs: action.payload.blogs ?? [], pagination: action.payload.pagination ?? null };

    case T.FETCH_BLOG_BY_ID_SUCCESS:
    case T.FETCH_BLOG_BY_SLUG_SUCCESS:
      return { ...state, loading: false, selectedBlog: action.payload };

    case T.CREATE_BLOG_SUCCESS:
      return { ...state, loading: false, blogs: [action.payload, ...state.blogs] };

    case T.UPDATE_BLOG_SUCCESS:
      return { ...state, loading: false, selectedBlog: action.payload, blogs: state.blogs.map(b => b.id === action.payload.id ? action.payload : b) };

    case T.DELETE_BLOG_SUCCESS:
      return { ...state, loading: false, selectedBlog: null, blogs: state.blogs.filter(b => String(b.id) !== String(action.payload)) };

    case T.FETCH_BLOGS_ERROR:
    case T.FETCH_BLOG_BY_ID_ERROR:
    case T.FETCH_BLOG_BY_SLUG_ERROR:
    case T.CREATE_BLOG_ERROR:
    case T.UPDATE_BLOG_ERROR:
    case T.DELETE_BLOG_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default blogReducer;
