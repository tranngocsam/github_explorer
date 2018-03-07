import actionTypes from "../constants";

export function setRequestStatus(requestType, status, responseData, responseStatus, additionalParams) {
  return {
    type: requestType,
    status,
    responseData,
    responseStatus,
    additionalParams
  };
}

export function performAction(requestType, fn, additionalParams) {
  additionalParams = additionalParams || {};

  return function(dispatch) {
    dispatch(setRequestStatus(requestType, actionTypes.REQUEST.LOADING, undefined, undefined, additionalParams));
    return fn().then(function(responseData, responseStatus) {
      dispatch(setRequestStatus(requestType, actionTypes.REQUEST.LOADING_SUCCESS, responseData, responseStatus, additionalParams));
    }, function(xhr, responseStatus) {
      dispatch(setRequestStatus(requestType, actionTypes.REQUEST.LOADING_ERROR, xhr.responseJSON, xhr.status, additionalParams));
    })
  }
}
