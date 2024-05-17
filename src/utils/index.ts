import every from "lodash-es/every";
import isNil from "lodash-es/isNil";
import isEmpty from "lodash-es/isEmpty";
export function getToken() {
  const tokenFromStorage = localStorage.getItem("token");
  const tokenFromCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return tokenFromStorage || tokenFromCookie || "";
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
