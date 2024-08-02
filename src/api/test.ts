import { Observable } from "rxjs";
import request from "@/utils/http";

// 测试flask的env
export function flask_env(): Observable<any> {
  const url = "/api/test/flask_env";
  return request<null, any>(url, "GET");
}

// 测试flask的celery
export function celery(): Observable<any> {
  const url = "/api/test/celery";
  return request<null, any>(url, "GET");
}
