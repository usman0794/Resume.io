import { combineReducers } from 'redux';
import userReducer    from './reducers/userReducer';
import resumeReducer  from './reducers/resumeReducer';
import blogReducer    from './reducers/blogReducer';
import templateReducer from './reducers/templateReducer';
import jobReducer     from './reducers/jobReducer';

const rootReducer = combineReducers({
  userReducer,
  resumeReducer,
  blogReducer,
  templateReducer,
  jobReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
