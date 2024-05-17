import { Observable } from "rxjs";
import request from "utils/http";

interface ListParams {
  page: number;
  size: number;
}

interface ListData {
  items: any[];
  total: number;
}

interface User {
  user_id?: string;
}

interface CreateUserParams {
  username: string;
  password: string;
  role: string;
}

// 获取列表
export function getUserList(params: ListParams): Observable<ListData> {
  const url = `/api/user/list?${new URLSearchParams(params as any).toString()}`;
  return request<ListParams, ListData>(url, "GET");
}

// 添加用户
export function addUser(data: CreateUserParams): Observable<User> {
  const url = "/api/user/add";
  return request<CreateUserParams, User>(url, "POST", data);
}

// 更新用户
export function updateUser(
  id: number,
  data: Partial<CreateUserParams>
): Observable<User> {
  const url = `/api/user/${id}`;
  return request<Partial<CreateUserParams>, User>(url, "PUT", data);
}

// 删除用户
export function deleteUser(id: number): Observable<void> {
  const url = `/api/user/${id}`;
  return request<null, void>(url, "DELETE");
}
