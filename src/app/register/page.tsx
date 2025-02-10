"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const handleRegist = async () => {
  //   console.log("login");
  //   const res = fetch("https://front-mission.bigs.or.kr/auth/signin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //     }),
  //   });

  //   const data = await (await res).json();

  //   if ((await res).ok) {
  //     localStorage.setItem("accessToken", data.accessToken);
  //   } else {
  //     console.error("Login failed", data);
  //   }
  // };

  const handleRegist = async () => {
    console.log("register");
    await fetch("https://front-mission.bigs.or.kr/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        password,
        confirmPassword,
      }),
    });
  };
  return (
    <div className="flex justify-center items-center h-screen mx-5">
      <div className="w-full">
        <p className="text-4xl text-center">회원가입</p>
        <div className="mt-10" />
        <div className="flex flex-col gap-5">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="이메일 형식"
            className="border border-gray-300 p-3 rounded-md"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="사용자 이름"
            className="border border-gray-300 p-3 rounded-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="비밀번호"
            className="border border-gray-300 p-3 rounded-md"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="비밀번호 확인"
            className="border border-gray-300 p-3 rounded-md"
          />
          <button
            className="bg-gray-500 text-white p-3 rounded-md"
            onClick={handleRegist}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
