import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  console.log("미들웨어 실행됨");
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    console.log("토큰 없음, 로그인 페이지로 이동");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken) {
    try {
      const decoded = jwt.decode(accessToken) as { exp?: number } | null;
      if (decoded?.exp) {
        const expirationTime = decoded.exp * 1000; // 밀리초 변환
        const refreshTime = expirationTime - 2 * 60 * 1000; // 만료 2분 전
        const currentTime = Date.now();

        if (currentTime >= refreshTime) {
          console.log("액세스 토큰 갱신 요청");
          const response = await fetch(
            "https://front-mission.bigs.or.kr/auth/refresh",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refreshToken: refreshToken,
              }),
            },
          );
          const data = await response.json();
          const res = NextResponse.next();
          res.cookies.set("accessToken", data.accessToken, {
            httpOnly: false,
            path: "/",
            maxAge: 60 * 60, // 1시간 유효
          });

          res.cookies.set("refreshToken", data.refreshToken, {
            httpOnly: false,
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30일 유효
          });

          return res;
        }
      }
    } catch (error) {
      console.error("토큰 디코딩 오류:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
