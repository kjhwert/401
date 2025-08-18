import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: new Date().getTime(),
  },
});

// 토큰 갱신 Promise
let refreshTokenRequest: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    // 401 에러응답일 때 토큰 재발행 요청 및 기존 API 재요청
    if (error.response?.status === 401) {
      refreshTokenRequest ||= api
        .post("/auth/token")
        .then((res) => {
          const newToken = res.data.token;
          api.defaults.headers["Authorization"] = newToken;
          return newToken;
        })
        .finally(() => {
          refreshTokenRequest = null;
        });

      // refresh 중이면 Promise를 반환하여 대기
      return refreshTokenRequest.then((token) => {
        // 기존 요청 재시도
        return api({ ...error.config, headers: { Authorization: token } });
      });
    }
  },
);

export default api;
