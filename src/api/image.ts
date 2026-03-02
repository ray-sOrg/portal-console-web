import { Observable } from "rxjs";
import request from "@/utils/http";
import { observableToPromise } from "@/utils";
import {
  ApiResponseSyncImage,
  ApiResponseSyncImageProgress,
  ApiRequestAllOssImage,
  ApiResponseAllOssImage
} from "@/types";

// 同步oss的图片到数据库
export function syncOssImages(): Observable<ApiResponseSyncImage> {
  const url = "/image/asyncOss";
  return request<null, ApiResponseSyncImage>(url, "GET");
}

// 查看oss的图片进度
export function watchOssImagesProgress(
  taskId: string
): Observable<ApiResponseSyncImageProgress> {
  const url = `/image/task_status/${taskId}`;
  return request<null, ApiResponseSyncImageProgress>(url, "GET");
}

// 查询所有的图片
export function getAllOssImage(
  params: ApiRequestAllOssImage
): Observable<ApiResponseAllOssImage> {
  const url = `/oss/images/list?${new URLSearchParams(
    params as any
  ).toString()}`;
  return request<ApiRequestAllOssImage, ApiResponseAllOssImage>(url, "GET");
}

export const getAllOssImagePromise = async (param: ApiRequestAllOssImage) =>
  await observableToPromise(getAllOssImage(param));
