import _ from "lodash";
import constants from '../constants';

// Note that actionStatus is for the current actionType, so it's volatile.
// For example if request1 is loading, then request2 loads and finishes before request1
// Then the actionStatus will have LOADING_SUCCESS value, it's not request1's status
export function handleLoadedData(type, status, state, action, options) {
  options = options || {};

  switch(status) {
    case constants.REQUEST.LOADING:
      var requestData = _.assign({
        actionType: type,
        actionStatus: constants.REQUEST.LOADING
      }, options.requestData);

      return _.assign(_.cloneDeep(state), requestData);
    case constants.REQUEST.LOADING_SUCCESS:
      var successData = _.assign({
        actionType: type,
        actionStatus: constants.REQUEST.LOADING_SUCCESS,
        responseError: undefined,
        responseStatus: action.responseStatus
      }, options.successData || {});

      return _.assign(_.cloneDeep(state), successData);
    case constants.REQUEST.LOADING_ERROR:
      var errorData = _.assign({
        actionType: type,
        actionStatus: constants.REQUEST.LOADING_ERROR,
        responseError: action.responseData,
        responseStatus: action.responseStatus
      }, options.errorData);

      return _.assign(_.cloneDeep(state), errorData);
    default:
      return state;
  }
}
