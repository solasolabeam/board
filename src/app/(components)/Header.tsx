"use client";

import { useRouter } from "next/navigation";
import useUserStore from "../store";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const router = useRouter();
  // const user = useUserStore((state) => state.user);

  const checkTokenExpiration = (token: string) => {
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      if (decoded.exp) {
        return decoded.exp * 1000; // 초 단위 → 밀리초 변환
      }
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
    }
    return null;
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(
        "https://front-mission.bigs.or.kr/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("토큰 갱신 실패");
      }

      const data = await response.json();
      const newAccessToken = data.accessToken;
      const newRefreshToken = data.refreshToken;

      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        console.log("새로운 엑세스 토큰 갱신됨");
      }
    } catch (error) {
      console.error("토큰 갱신 중 오류 발생:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    useUserStore.getState().setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      handleLogout();
      return;
    }

    const expirationTime = checkTokenExpiration(token);

    if (!expirationTime) {
      handleLogout();
      return;
    }

    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const refreshTime = timeUntilExpiration - 120000; // 만료 2분 전에 리프레시 요청

    if (timeUntilExpiration <= 0) {
      console.log("토큰 만료됨, 로그아웃 처리");
      handleLogout();
    } else {
      console.log(`토큰 만료까지 남은 시간: ${timeUntilExpiration / 1000}초`);
      const timer = setTimeout(refreshAccessToken, refreshTime);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {/* {user && (
        <div className="flex justify-end gap-5">
          <p className="text-sm">
            <span className="font-bold">{user.username}</span> 님
          </p>
          <p className="text-sm" onClick={handleLogout}>
            로그아웃
          </p>
        </div>
      )} */}
      <div className="flex justify-end gap-5">
        <p className="text-sm" onClick={handleLogout}>
          로그아웃
        </p>
      </div>
    </div>
  );
}
