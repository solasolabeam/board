"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("login");
    const res = fetch("https://front-mission.bigs.or.kr/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await (await res).json();

    if ((await res).ok) {
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      console.error("Login failed", data);
    }
  };

  //   const handleRegister = async () => {
  // console.log("register");
  // const res = await fetch("https://front-mission.bigs.or.kr/boards/219", {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await res.json();
  // console.log(data);
  // fetch("https://front-mission.bigs.or.kr/auth/signup", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //         username,
  //         password,
  //     }),
  // })
  //   };
  return (
    <div className="flex justify-center items-center h-screen mx-5">
      <div className="w-full">
        <p className="text-4xl text-center">로그인</p>
        <div className="mt-10" />
        <div className="flex flex-col gap-5">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="아이디"
            className="border border-gray-300 p-3 rounded-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            type="password"
            placeholder="비밀번호"
            className="border border-gray-300 p-3 rounded-md"
          />
          <button
            className="bg-gray-500 text-white p-3 rounded-md"
            onClick={handleLogin}
          >
            로그인
          </button>
          <button
            className="border border-gray-400  text-black p-3 rounded-md"
            onClick={() => router.push("/register")}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
