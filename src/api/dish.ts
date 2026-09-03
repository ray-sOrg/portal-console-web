import { Observable } from "rxjs";
import request from "@/utils/http";

export type DishCategory =
  | "RECOMMENDED"
  | "COLD_DISH"
  | "SEASONAL_VEGETABLE"
  | "HOT_DISH"
  | "SOUP"
  | "SNACK_STAPLE"
  | "SEAFOOD"
  | "BEVERAGE"
  | "BAIJIU"
  | "BEER"
  | "FITNESS_MEAL"
  | "OTHER";

export type NutritionBasis = "PER_100G" | "PER_100ML" | "PER_SERVING";

export type ServingUnit = "g" | "ml" | "piece" | "serving";

export interface DishNutrition {
  basis: NutritionBasis;
  defaultServingAmount: number;
  servingUnit: ServingUnit;
  caloriesKcal: number;
  proteinG?: number | null;
  carbohydrateG?: number | null;
  fatG?: number | null;
  fiberG?: number | null;
  sugarG?: number | null;
  sodiumMg?: number | null;
  labelImageUrl?: string | null;
}

export interface Dish {
  id: string;
  name: string;
  nameEn?: string | null;
  description?: string | null;
  descEn?: string | null;
  price: number;
  image?: string | null;
  category: DishCategory;
  isSpicy: boolean;
  isVegetarian: boolean;
  isAvailable: boolean;
  nutrition?: DishNutrition | null;
  createdAt: string;
  updatedAt: string;
}

export type DishMutation = Omit<Dish, "createdAt" | "updatedAt">;

interface DishResponse {
  code: number;
  data: Dish;
  message: string;
}

interface DishListResponse {
  code: number;
  data: Dish[];
  message: string;
}

// 获取菜品列表
export function getDishList(): Observable<DishListResponse> {
  const url = "/api/chuan-dai/dish/list";
  return request<null, DishListResponse>(url, "GET");
}

// 获取单个菜品
export function getDish(id: string): Observable<DishResponse> {
  const url = `/api/chuan-dai/dish/${id}`;
  return request<null, DishResponse>(url, "GET");
}

// 创建菜品
export function createDish(data: DishMutation): Observable<DishResponse> {
  const url = "/api/chuan-dai/dish";
  return request<DishMutation, DishResponse>(url, "POST", data);
}

// 更新菜品
export function updateDish(
  id: string,
  data: DishMutation
): Observable<DishResponse> {
  const url = `/api/chuan-dai/dish/${id}`;
  return request<DishMutation, DishResponse>(url, "PUT", data);
}

// 删除菜品
export function deleteDish(id: string): Observable<{ code: number; data: {}; message: string }> {
  const url = `/api/chuan-dai/dish/${id}`;
  return request<null, { code: number; data: {}; message: string }>(url, "DELETE");
}

// 切换菜品上下架
export function toggleDishAvailability(id: string): Observable<DishResponse> {
  const url = `/api/chuan-dai/dish/${id}/toggle`;
  return request<null, DishResponse>(url, "POST");
}
