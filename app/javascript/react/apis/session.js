import { submitRequest } from "./utils";

export function doLoadCurrentUser(params) {
  return submitRequest("/api/v1/sessions/me", "get", params);
}
