import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users", (request) => {
    const token = request.request.headers.get("Authorization");

    if (!token) {
      return new HttpResponse(null, { status: 401 });
    }

    // 3초가 지나면 토큰 만료처리
    if (new Date(Number(token)).getTime() + 3000 < new Date().getTime()) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json([
      {
        id: 1,
        name: Math.floor(Math.random() * 1000),
      },
      {
        id: 2,
        name: Math.floor(Math.random() * 1000),
      },
      {
        id: 3,
        name: Math.floor(Math.random() * 1000),
      },
      {
        id: 4,
        name: Math.floor(Math.random() * 1000),
      },
    ]);
  }),
  http.get("/api/users/:id", (request) => {
    if (request.request.headers.get("Authorization") === "invalidToken") {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json({
      id: 1,
      name: Math.floor(Math.random() * 1000),
    });
  }),
  http.get("/api/posts", (request) => {
    if (request.request.headers.get("Authorization") === "invalidToken") {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json([
      {
        id: 1,
        title: Math.floor(Math.random() * 1000),
      },
      {
        id: 2,
        title: Math.floor(Math.random() * 1000),
      },
      {
        id: 3,
        title: Math.floor(Math.random() * 1000),
      },
      {
        id: 4,
        title: Math.floor(Math.random() * 1000),
      },
    ]);
  }),
  http.post("/auth/token", () => {
    return HttpResponse.json({
      token: new Date().getTime(),
    });
  }),
];
