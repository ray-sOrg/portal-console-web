import { firstValueFrom } from "rxjs";
import request from "@/utils/http";

export type ChuanDaiRole = "HOST" | "GUEST";

export interface ChuanDaiUser {
  id: string;
  account: string;
  nickname: string | null;
  avatar: string | null;
  phone: string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  birthday: string | null;
  bio: string | null;
  role: ChuanDaiRole;
  createdAt: string | null;
  updatedAt: string | null;
  lastLoginAt: string | null;
}

export interface ChuanDaiUserFilters {
  pageNumber: number;
  pageSize: number;
  keyword: string;
  role: ChuanDaiRole | "";
}

interface UserPage {
  items: ChuanDaiUser[];
  total: number;
  pageNumber: number;
  pageSize: number;
}

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

async function read<T>(url: string): Promise<T> {
  const result = await firstValueFrom(request<null, ApiResponse<T>>(url));
  if (result.code !== 200) {
    const authExpired = [5001, 5002, 5003, 5004, 5005].includes(result.code);
    throw new Error(
      authExpired ? "登录已失效，请重新登录后查看" : result.message || "获取用户失败"
    );
  }
  return result.data;
}

export function getChuanDaiUsers(filters: ChuanDaiUserFilters) {
  const params = new URLSearchParams({
    pageNumber: String(filters.pageNumber),
    pageSize: String(filters.pageSize),
    keyword: filters.keyword,
    role: filters.role
  });
  return read<UserPage>(`/api/chuan-dai/user/list?${params}`);
}

export function getChuanDaiUser(id: string) {
  return read<ChuanDaiUser>(`/api/chuan-dai/user/${encodeURIComponent(id)}`);
}
