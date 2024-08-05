import { Observable } from "rxjs";
import request from "@/utils/http";
import {
  ApiResponseWeddingMusic,
  ApiRequestWeddingMusicList,
  ApiRequestWeddingImageList,
  ApiResponseWeddingImage
} from "@/types";

export function getWeddingMusic(
  params: ApiRequestWeddingMusicList
): Observable<ApiResponseWeddingMusic> {
  const url = `/api/wedding/music/list?${new URLSearchParams(
    params as any
  ).toString()}`;
  return request<null, ApiResponseWeddingMusic>(url, "GET");
}

export function getWeddingImage(
  params: ApiRequestWeddingImageList
): Observable<ApiResponseWeddingImage> {
  const url = `/api/wedding/photo/wall/list?${new URLSearchParams(
    params as any
  ).toString()}`;
  return request<null, ApiResponseWeddingImage>(url, "GET");
}
