import { Observable } from "rxjs";
import { notification } from "antd";
import Cookies from "js-cookie";

// API 基础 URL（生产环境用独立域名，开发环境用代理）
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// 封装发送请求的方法
function request<P = any, R = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body: P | null = null
): Observable<R> {
  // 拼接完整 URL
  const fullUrl = API_BASE_URL + url;
  
  return new Observable(observer => {
    const csrfToken = method === "GET" ? undefined : Cookies.get("csrf_access_token");
    fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {})
      },
      body: body ? JSON.stringify(body) : null,
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          notification.open({ type: "error", message: response.statusText });
          // HTTP 状态码不为 200，抛出系统级错误
          throw new Error("System error: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // 业务逻辑正常，向观察者发送数据
        observer.next(data as R);
        observer.complete();
      })
      .catch(error => {
        // 捕获所有可能的错误并通知观察者
        observer.error(error);
      });
  });
}

export default request;
