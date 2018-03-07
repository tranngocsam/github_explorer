import constants from '../constants';
import _ from "lodash";
import { handleLoadedData } from "./utils";

export default function sessionReducer(state = {}, action) {
  const {type, status} = action;

  switch (type) {
    case constants.SESSION.LOAD_CURRENT_USER:
      var options = {};

      if (status == constants.REQUEST.LOADING_SUCCESS) {
        let user = (action.responseData || {}).data;

        options.successData = {currentUser: user};
      }

      return handleLoadedData(type, status, state, action, options);
    default:
      return state;
  }
}
