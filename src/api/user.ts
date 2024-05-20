import { Observable } from "rxjs";
import request from "utils/http";
import {
  ApiRequestAddUser,
  ApiResponseAddUser,
  ApiRequestUserList,
  ApiResponseUserList,
  ApiRequestDeleteUser,
  ApiResponseDeleteUser
} from "types";

// 获取列表
export function getUserList(
  params: ApiRequestUserList
): Observable<ApiResponseUserList> {
  const url = `/api/user/list?${new URLSearchParams(params as any).toString()}`;
  return request<ApiRequestUserList, ApiResponseUserList>(url, "GET");
}

// 添加用户
export function addUser(
  data: ApiRequestAddUser
): Observable<ApiResponseAddUser> {
  const url = "/api/user/add";
  return request<ApiRequestAddUser, ApiResponseAddUser>(url, "POST", data);
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
