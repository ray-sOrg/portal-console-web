import { Observable } from "rxjs";
import request from "@/utils/http";

import {
  ApiRequestLogin,
  ApiResponseLogin,
  ApiResponseLoginOut
} from "@/types";

// 登录
export function login(data: ApiRequestLogin): Observable<ApiResponseLogin> {
  const url = "/login";
  return request<ApiRequestLogin, ApiResponseLogin>(url, "POST", data);
}

// 登出
export function loginOut(): Observable<ApiResponseLoginOut> {
  const url = "/logout";
  return request<null, ApiResponseLogin>(url, "POST");
}
