import { Observable } from "rxjs";
import request from "@/utils/http";

import {
  ApiRequestLogin,
  ApiResponseLogin,
  ApiResponseLoginOut
} from "@/types";

// 登录
export function login(data: ApiRequestLogin): Observable<ApiResponseLogin> {
  const url = "/api/auth/login";
  return request<ApiRequestLogin, ApiResponseLogin>(url, "POST", data);
}

// 登出
export function loginOut(): Observable<Omit<ApiResponseLoginOut, 'data'> & {data: {logoutUrl: string}}> {
  const url = "/api/auth/logout?unified=1&app=console";
  return request(url, "POST");
}
