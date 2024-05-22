import { Observable } from "rxjs";
import request from "utils/http";

import { ApiRequestLogin, ApiResponseLogin } from "types";

// 登录
export function login(data: ApiRequestLogin): Observable<ApiResponseLogin> {
  const url = "/api/login";
  return request<ApiRequestLogin, ApiResponseLogin>(url, "POST", data);
}
