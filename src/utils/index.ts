import Cookies from "js-cookie";
import every from "lodash-es/every";
import isNil from "lodash-es/isNil";
import isEmpty from "lodash-es/isEmpty";
import { Observable } from "rxjs";

// 获取 cookie
export function getCookie(key: string): string | undefined {
  return Cookies.get(key);
}

// 获取 localStorage
export function getLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

// 设置 cookie
export function setCookie(
  key: string,
  value: any,
  expiresDays: number = 7
): void {
  if (typeof key !== "string" || typeof value === "undefined") {
    throw new Error("Key must be a string and value must be defined");
  }
  Cookies.set(key, value, { expires: expiresDays });
}

// 设置 localStorage
export function setLocalStorage(key: string, value: any): void {
  if (typeof key !== "string" || typeof value === "undefined") {
    throw new Error("Key must be a string and value must be defined");
  }
  localStorage.setItem(key, value);
}

export function areAllValuesNonEmpty<T extends Record<string, any>>(
  obj: T
): boolean {
  return every(obj, value => {
    // 检查值是否为 null 或 undefined
    if (isNil(value)) return false;
    // 检查值是否为字符串类型的空字符串
    if (typeof value === "string" && isEmpty(value)) return false;
    // 检查其他类型的空值（空数组、空对象等）
    if (typeof value === "object" && isEmpty(value)) return false;
    // 对于其他类型的值（如数字、布尔值等），默认不为空
    return true;
  });
}

export const observableToPromise = <T>(
  observable: Observable<T>
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const subscription = observable.subscribe({
      next: data => {
        resolve(data);
        subscription.unsubscribe(); // Ensure to unsubscribe after first resolve
      },
      error: error => {
        reject(error);
        subscription.unsubscribe(); // Ensure to unsubscribe on error
      }
    });
  });
};
