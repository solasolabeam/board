"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function ClientSideRefresh() {
  useEffect(() => {
    const intervalId = setInterval(
      async () => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");
        if (accessToken && refreshToken) {
          try {
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

            document.cookie = `accessToken=${data.accessToken}; path=/;`;
            document.cookie = `refreshToken=${data.refreshToken}; path=/;`;
          } catch (error) {
            console.error("Error refreshing token:", error);
          }
        } else {
          console.log("No valid tokens found");
          clearInterval(intervalId);
        }
      },
      2 * 60 * 1000,
    ); // 2분마다

    return () => clearInterval(intervalId); // 클린업
  }, []);

  return null; // 화면에 아무것도 렌더링하지 않음
}
