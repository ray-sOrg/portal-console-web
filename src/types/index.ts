export interface Page {
  pageNumber: number;
  pageSize: number;
}

export interface ApiRequestLogin {
  username: string;
  password: string;
}

export interface ApiResponseLogin {
  code: number;
  message: string;
  data: User;
  token?: string;
}

export interface ApiResponseAuthCheckToken {
  code: number;
  message: string;
  data: User;
}

export interface ApiRequestUserList {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
}

export interface User {
  role: string;
  username: string;
  uuid: string;
  create_time: string;
}

export interface ApiResponseUserList {
  code: number;
  message: string;
  data: User[];
  total: number;
}

export interface ApiRequestAddUser {
  username: string;
  password: string;
  role: string | "user" | "admin" | "super_admin";
}

export interface ApiResponseAddUser {
  code: number;
  message: string;
  data: {
    user_id: string;
  };
}

export interface ApiRequestDeleteUser {
  uuid: string;
}

export interface ApiResponseDeleteUser {
  code: number;
  message: string;
  data: {
    user_id: string;
  };
}

export interface ApiResponseLoginUserInfo {
  code: number;
  message: string;
  data: User;
}
