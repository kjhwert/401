import { ServerError } from "@/apis/serverError";
import type { ApiResponse } from "@/apis/type";
import axios from "axios";

export * from "./type";
export * from "./serverError";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: new Date().getTime(),
  },
});

// 토큰 갱신 Promise
let refreshTokenRequest: Promise<number> | null = null;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    // 401 에러응답일 때 토큰 재발행 요청 및 기존 API 재요청
    if (error.response?.status === 401) {
      refreshTokenRequest ||= instance
        .post<{ token: number }>("/auth/token")
        .then((res) => {
          const newToken = res.data.token;

          instance.defaults.headers["Authorization"] = newToken;
          return newToken;
        })
        .finally(() => {
          refreshTokenRequest = null;
        });

      // refresh 중이면 Promise를 반환하여 대기
      return refreshTokenRequest.then((token) => {
        // 기존 요청 재시도
        return instance({ ...error.config, headers: { Authorization: token } });
      });
    }
  },
);

const api = {
  get: async <T>(...params: Parameters<typeof instance.get>) =>
    instance.get<ApiResponse<T>>(...params).then((res) => {
      if (res.data.status === 200) {
        return res.data.data;
      }

      throw new ServerError(res.data.code, res.data.message);
    }),
  post: async <T>(...params: Parameters<typeof instance.post>) =>
    instance.post<ApiResponse<T>>(...params).then((res) => {
      if (res.data.status === 200) {
        return res.data.data;
      }

      throw new ServerError(res.data.code, res.data.message);
    }),
  put: async <T>(...params: Parameters<typeof instance.put>) =>
    instance.put<ApiResponse<T>>(...params).then((res) => {
      if (res.data.status === 200) {
        return res.data.data;
      }

      throw new ServerError(res.data.code, res.data.message);
    }),
  delete: async <T>(...params: Parameters<typeof instance.delete>) =>
    instance.delete<ApiResponse<T>>(...params).then((res) => {
      if (res.data.status === 200) {
        return res.data.data;
      }

      throw new ServerError(res.data.code, res.data.message);
    }),
};

export default api;
