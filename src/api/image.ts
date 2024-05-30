import { Observable } from "rxjs";
import request from "utils/http";
import { ApiResponseSyncImage, ApiResponseSyncImageProgress } from "types";

// 同步oss的图片到数据库
export function syncOssImages(): Observable<ApiResponseSyncImage> {
  const url = "/api/image/asyncOss";
  return request<null, ApiResponseSyncImage>(url, "GET");
}

// 查看oss的图片进度
export function watchOssImagesProgress(
  taskId: string
): Observable<ApiResponseSyncImageProgress> {
  const url = `/image/task_status/${taskId}`;
  return request<null, ApiResponseSyncImageProgress>(url, "GET");
}
