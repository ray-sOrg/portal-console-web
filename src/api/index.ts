import useFetch from "utils/http";

export function testApi() {
  return useFetch("/api/index");
}
