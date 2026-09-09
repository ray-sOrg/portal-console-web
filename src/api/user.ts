import { Observable } from "rxjs";
import request from "@/utils/http";
import {
  ApiRequestUserList,
  ApiResponseUserList,
  ApiRequestDeleteUser,
  ApiResponseDeleteUser,
  ApiResponseLoginUserInfo
} from "@/types";

// 获取用户登录信息的接口
export function getLoginUserInfo(): Observable<ApiResponseLoginUserInfo> {
  const url = "/api/user/login/info";
  return request<null, ApiResponseLoginUserInfo>(url, "GET");
}

// 获取列表
export function getUserList(
  params: ApiRequestUserList
): Observable<ApiResponseUserList> {
  const url = `/api/user/list?${new URLSearchParams(params as any).toString()}`;
  return request<ApiRequestUserList, ApiResponseUserList>(url, "GET");
}

// 删除用户
export function deleteUser(
  data: ApiRequestDeleteUser
): Observable<ApiResponseDeleteUser> {
  const url = `/api/user/delete`;
  return request<ApiRequestDeleteUser, ApiResponseDeleteUser>(
    url,
    "POST",
    data
  );
}
