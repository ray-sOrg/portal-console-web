import { Observable } from "rxjs";
import request from "@/utils/http";

export type CredentialsType = "music" | "image";

// get credentials
export function get_oss_credentials(type: CredentialsType): Observable<any> {
  const url = `/api/oss/credentials?type=${type}`;
  return request<null, any>(url, "GET");
}
