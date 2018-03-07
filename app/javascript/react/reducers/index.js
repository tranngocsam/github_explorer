import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import fileReducer from "./file_reducer";

const reducer = combineReducers({
  sessionStore: sessionReducer,
  fileStore: fileReducer
});

export default reducer;
