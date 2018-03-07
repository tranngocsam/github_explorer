import _ from "lodash";
import constants from "../constants";
import { setRequestStatus, performAction } from "./utils";
import {
  doLoadCurrentUser,
  doRegister,
  doLogin,
} from "../apis/session";

export function loadCurrentUser(params) {
  var requestType = constants.SESSION.LOAD_CURRENT_USER;

  return performAction(requestType, ()=>
    doLoadCurrentUser(params)
  );
}
