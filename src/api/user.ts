import { Observable } from "rxjs";
import request from "@/utils/http";
import {
  ApiRequestAddUser,
  ApiResponseAddUser,
  ApiRequestUserList,
  ApiResponseUserList,
  ApiRequestDeleteUser,
  ApiResponseDeleteUser,
  ApiResponseLoginUserInfo
} from "@/types";

// 获取用户登录信息的接口
export function getLoginUserInfo(): Observable<ApiResponseLoginUserInfo> {
  const url = "/user/login/info";
  return request<null, ApiResponseLoginUserInfo>(url, "GET");
}

// 获取列表
export function getUserList(
  params: ApiRequestUserList
): Observable<ApiResponseUserList> {
  const url = `/user/list?${new URLSearchParams(params as any).toString()}`;
  return request<ApiRequestUserList, ApiResponseUserList>(url, "GET");
}

// 添加用户
export function addUser(
  data: ApiRequestAddUser
): Observable<ApiResponseAddUser> {
  const url = "/user/add";
  return request<ApiRequestAddUser, ApiResponseAddUser>(url, "POST", data);
}

// 删除用户
export function deleteUser(
  data: ApiRequestDeleteUser
): Observable<ApiResponseDeleteUser> {
  const url = `/user/delete`;
  return request<ApiRequestDeleteUser, ApiResponseDeleteUser>(
    url,
    "POST",
    data
  );
}
