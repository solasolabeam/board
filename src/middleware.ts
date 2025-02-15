import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("미들웨어 실행됨");
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    console.log("토큰 없음, 로그인 페이지로 이동");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next(); // 요청 계속 진행
}

export const config = {
  matcher: [
    /*
     * api (API 라우트)
     * _next/static (정적 파일)
     * _next/image (이미지 최적화 파일)
     * favicon.ico (파비콘 파일)
     * 로 시작하지 않는 모든 요청 경로와 일치합니다.
     */
    "/((?!login|_next/static|_next/image|favicon.ico).*)",
  ],
};
