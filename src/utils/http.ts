import useSWR, { SWRConfiguration, KeyedMutator } from "swr";
import { useNavigate } from "react-router-dom";
import { getToken } from "./index";

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

interface FetcherResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  mutate: KeyedMutator<ApiResponse<T>>;
}

const defaultSwrConfig = {
  shouldRetryOnError: false
};

const fetcher = async <T>(
  url: string,
  method: string,
  token: string | null,
  body?: any
): Promise<ApiResponse<T>> => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "" // 在请求头中添加 token
    },
    credentials: "include" // 包含 cookie
  };

  // 仅当请求方法为 POST、PUT、DELETE 等时才添加请求体
  if (method !== "GET" && method !== "HEAD") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  const responseData: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
};

const useFetch = <T>(
  url: string,
  method: string = "GET",
  config?: Partial<SWRConfiguration<ApiResponse<T>, Error>>
): FetcherResponse<T> => {
  const token = getToken();
  const navigate = useNavigate();

  const { data, error, mutate } = useSWR<ApiResponse<T>, Error>(
    [url, method, token],
    ([url, method, token]: [string, string, string | null]) =>
      fetcher<T>(url, method, token, {}),
    Object.assign({}, defaultSwrConfig, config)
  );

  if (data && data.code === 5000) {
    navigate("/login");
  }

  return {
    data: data?.data || null,
    error: error || null,
    mutate,
    isLoading: !data && !error
  };
};

export default useFetch;
