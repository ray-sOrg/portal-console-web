import { Observable } from "rxjs";
import request from "@/utils/http";
import {
  ApiResponseWeddingMusic,
  ApiRequestWeddingMusicList,
  ApiRequestWeddingImageList,
  ApiResponseWeddingImage,
  ApiRequestAddWeddingMusic,
  ApiResponseAddWeddingMusic
} from "@/types";

export function addWeddingMusic(
  params: ApiRequestAddWeddingMusic
): Observable<ApiResponseAddWeddingMusic> {
  const url = "/api/wedding/music/add";
  return request<ApiRequestAddWeddingMusic, ApiResponseAddWeddingMusic>(
    url,
    "POST",
    params
  );
}

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
