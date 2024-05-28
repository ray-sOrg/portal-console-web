import { Observable } from "rxjs";
import request from "utils/http";
import { ApiRequestSyncImage, ApiResponseSyncImage } from "types";

// 同步oss的图片到数据库
export function syncOssImages(): Observable<ApiRequestSyncImage> {
  const url = "/api/image/asyncOss";
  return request<null, ApiResponseSyncImage>(url, "GET");
}
