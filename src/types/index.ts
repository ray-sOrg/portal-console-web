export interface BaseApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

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

export interface ApiResponseLoginOut {
  code: number;
  message: string;
  data: User;
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

export interface ApiRequestSyncImage {}

interface SyncImage {}
export interface ApiResponseSyncImage extends BaseApiResponse<SyncImage> {
  task_id: string;
}

interface SyncImageProgress {
  state: string;
  current: number;
  total: number;
  status: string;
  result?: unknown;
}

export interface ApiResponseSyncImageProgress
  extends BaseApiResponse<SyncImageProgress> {}

export interface ApiRequestWeddingMusicList {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
}

export interface WeddingMusic {
  id: string | number;
  title: string;
  artist: string;
  path: string;
  album?: string;
}
export interface ApiResponseWeddingMusic {
  code: number;
  message: string;
  data: WeddingMusic[];
  total: number;
}
