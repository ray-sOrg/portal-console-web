import { Observable } from "rxjs";
import request from "@/utils/http";

import { ApiResponseLoginOut } from "@/types";

// 登出
export function loginOut(): Observable<Omit<ApiResponseLoginOut, 'data'> & {data: {logoutUrl: string}}> {
  const url = "/api/auth/logout?unified=1&app=console";
  return request(url, "POST");
}
