"use client";
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen mx-5">
      <div className="w-full">
        <p className="text-4xl text-center">로그인</p>
        <div className="mt-10" />
        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="아이디"
            className="border border-gray-300 p-3 rounded-md"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="border border-gray-300 p-3 rounded-md"
          />
          <button className="bg-gray-500 text-white p-3 rounded-md">
            로그인
          </button>
          <button className="border border-gray-400  text-black p-3 rounded-md ">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
