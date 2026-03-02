import { Observable } from "rxjs";
import request from "@/utils/http";

export interface Dish {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descEn: string;
  price: number;
  image: string;
  category: string;
  isSpicy: boolean;
  isVegetarian: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// 获取菜品列表
export function getDishList(): Observable<{ code: number; data: Dish[]; message: string }> {
  const url = "/chuan-dai/dish/list";
  return request<null, { code: number; data: Dish[]; message: string }>(url, "GET");
}

// 获取单个菜品
export function getDish(id: string): Observable<{ code: number; data: Dish; message: string }> {
  const url = `/chuan-dai/dish/${id}`;
  return request<null, { code: number; data: Dish; message: string }>(url, "GET");
}

// 创建菜品
export function createDish(data: Partial<Dish>): Observable<{ code: number; data: Dish; message: string }> {
  const url = "/chuan-dai/dish";
  return request<Partial<Dish>, { code: number; data: Dish; message: string }>(url, "POST", data);
}

// 更新菜品
export function updateDish(id: string, data: Partial<Dish>): Observable<{ code: number; data: Dish; message: string }> {
  const url = `/chuan-dai/dish/${id}`;
  return request<Partial<Dish>, { code: number; data: Dish; message: string }>(url, "PUT", data);
}

// 删除菜品
export function deleteDish(id: string): Observable<{ code: number; data: {}; message: string }> {
  const url = `/chuan-dai/dish/${id}`;
  return request<null, { code: number; data: {}; message: string }>(url, "DELETE");
}

// 切换菜品上下架
export function toggleDishAvailability(id: string): Observable<{ code: number; data: Dish; message: string }> {
  const url = `/chuan-dai/dish/${id}/toggle`;
  return request<null, { code: number; data: Dish; message: string }>(url, "POST");
}
