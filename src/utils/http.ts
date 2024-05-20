import { Observable } from "rxjs";
import { getToken } from "utils";

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
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}` // 添加 token 到请求头
      },
      body: body ? JSON.stringify(body) : null,
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response?.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.code === 200) {
          observer.next(data as R); // 发送数据到 Observable
          observer.complete(); // 发送完成信号
        } else if (data.code === 5000) {
          window.location.href = "/login"; // 重定向到 /login 路由
        } else {
          throw new Error(data.message); // 抛出错误信息
        }
      })
      .catch(error => {
        observer.error(error); // 发送错误信息到 Observable
      });
  });
}

export default request;
