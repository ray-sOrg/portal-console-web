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
  shouldRetryOnError: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  onError: (err: unknown) => {
    console.error("SWR error:", err);
  }
};

const fetcher = async <T>(
  url: string,
  method: string,
  token: string | null,
  body?: unknown
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

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // 如果响应状态不是 ok，抛出错误
      const errorResponse = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorResponse}`
      );
    }

    const responseData: ApiResponse<T> = await response.json();
    return responseData;
  } catch (error) {
    // 在这里可以处理错误，防止浏览器直接显示错误页面
    console.error("Fetch error:", error);
    throw error; // 重新抛出错误，让上层去处理
  }
};

export type ConfigType<T> = Partial<SWRConfiguration<ApiResponse<T>, Error>>;

const useFetch = <P, T>(
  url: string | null,
  method: string = "GET",
  params?: P,
  config?: ConfigType<T>
): FetcherResponse<T> => {
  const token = getToken();
  const navigate = useNavigate();

  const { data, error, mutate } = useSWR<ApiResponse<T>, Error>(
    url ? [url, method, token, params] : null,
    ([url, method, token, params]: [string, string, string | null, P]) =>
      fetcher<T>(url, method, token, params),
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
