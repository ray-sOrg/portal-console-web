import { Observable } from "rxjs";
import request from "@/utils/http";
import {
  ApiResponseWeddingMusic,
  ApiRequestWeddingMusicList,
  ApiRequestWeddingImageList,
  ApiResponseWeddingImage,
  ApiRequestAddWeddingMusic,
  ApiResponseAddWeddingMusic,
  ApiRequestAddWeddingImage,
  ApiResponseAddWeddingImage,
  ApiRequestDeleteWeddingImage,
  ApiResponseDeleteWeddingMusic,
  ApiRequestEditWeddingImage,
  ApiResponseEditWeddingImage
} from "@/types";

export function addWeddingMusic(
  params: ApiRequestAddWeddingMusic
): Observable<ApiResponseAddWeddingMusic> {
  const url = "/wedding/music/add";
  return request<ApiRequestAddWeddingMusic, ApiResponseAddWeddingMusic>(
    url,
    "POST",
    params
  );
}

export function addWeddingImage(
  params: ApiRequestAddWeddingImage
): Observable<ApiResponseAddWeddingImage> {
  const url = "/wedding/photo/wall/add";
  return request<ApiRequestAddWeddingImage, ApiResponseAddWeddingImage>(
    url,
    "POST",
    params
  );
}

export function getWeddingMusic(
  params: ApiRequestWeddingMusicList
): Observable<ApiResponseWeddingMusic> {
  const url = `/wedding/music/list?${new URLSearchParams(
    params as any
  ).toString()}`;
  return request<null, ApiResponseWeddingMusic>(url, "GET");
}

export function getWeddingImage(
  params: ApiRequestWeddingImageList
): Observable<ApiResponseWeddingImage> {
  const url = `/wedding/photo/wall/list?${new URLSearchParams(
    params as any
  ).toString()}`;
  return request<null, ApiResponseWeddingImage>(url, "GET");
}

export function deleteWeddingImage(
  params: ApiRequestDeleteWeddingImage
): Observable<ApiResponseDeleteWeddingMusic> {
  const url = "/wedding/photo/wall/delete";
  return request<ApiRequestDeleteWeddingImage, ApiResponseDeleteWeddingMusic>(
    url,
    "POST",
    params
  );
}

export function editWeddingImage(
  params: ApiRequestEditWeddingImage
): Observable<ApiResponseEditWeddingImage> {
  const url = "/wedding/photo/wall/edit";
  return request<ApiRequestEditWeddingImage, ApiResponseEditWeddingImage>(
    url,
    "POST",
    params
  );
}
