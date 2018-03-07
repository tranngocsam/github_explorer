import constants from '../constants';
import _ from "lodash";
import { handleLoadedData } from "./utils";

export default function fileReducer(state = {}, action) {
  const {type, status} = action;

  switch (type) {
    case constants.FILE.LOAD_FILES:
      var options = {};

      if (status == constants.REQUEST.LOADING_SUCCESS) {
        let files = action.responseData;

        options.successData = {files: files};
      }

      return handleLoadedData(type, status, state, action, options);
    case constants.FILE.LOAD_REPOS:
      var options = {};

      if (status == constants.REQUEST.LOADING_SUCCESS) {
        let repos = action.responseData;

        options.successData = {repos: repos};
      }

      return handleLoadedData(type, status, state, action, options);
    default:
      return state;
  }
}
