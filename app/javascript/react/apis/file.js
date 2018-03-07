import { submitRequest } from "./utils";

const API_PREFIX = "https://api.github.com";

export function doLoadFiles(repo, path, params) {
  return submitRequest(API_PREFIX + "/repos/" + repo + "/contents/" + (path || ""), "get", params);
}

export function doLoadRepos(username, params) {
  return submitRequest(API_PREFIX + "/users/" + username + "/repos", "get", params);
}
