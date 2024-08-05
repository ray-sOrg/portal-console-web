import { Observable } from "rxjs";
import request from "@/utils/http";

// 测试flask的env
export function get_oss_credentials(): Observable<any> {
  const url = "/api/oss/credentials";
  return request<null, any>(url, "GET");
}
