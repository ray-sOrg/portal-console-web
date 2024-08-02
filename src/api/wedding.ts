import { Observable } from "rxjs";
import request from "@/utils/http";
import { ApiResponseWeddingMusic, ApiRequestWeddingMusicList } from "@/types";

export function getWeddingMusic(
  params: ApiRequestWeddingMusicList
): Observable<ApiResponseWeddingMusic> {
  const url = `/api/wedding/music/list?${new URLSearchParams(
    params as any
  ).toString()}`;
  return request<null, ApiResponseWeddingMusic>(url, "GET");
}
