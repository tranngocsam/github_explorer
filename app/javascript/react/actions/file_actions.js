import _ from "lodash";
import constants from "../constants";
import { setRequestStatus, performAction } from "./utils";
import { doLoadFiles, doLoadRepos } from "../apis/file";

export function loadRepos(username, params) {
  var requestType = constants.FILE.LOAD_REPOS;

  return performAction(requestType, ()=>
    doLoadRepos(username, params)
  );
}

export function loadFiles(repo, path, params) {
  var requestType = constants.FILE.LOAD_FILES;

  return performAction(requestType, ()=>
    doLoadFiles(repo, path, params)
  );
}
