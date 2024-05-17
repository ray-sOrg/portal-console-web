export interface ApiRequestAddUser {
  username: string;
  password: string;
  role: string | "user" | "admin" | "super_admin";
}
export interface ApiResponseAddUser {
  code: number;
  message: string;
  data: string;
}
