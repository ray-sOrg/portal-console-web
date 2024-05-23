import { Observable } from "rxjs";
import { notification } from "antd";

// 封装发送请求的方法
function request<P = any, R = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body: P | null = null
): Observable<R> {
  return new Observable(observer => {
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
        // "X-CSRF-TOKEN": getToken()
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
