"use client";
import { useRouter } from "next/navigation";
import StickyHeadTable from "./_components/ReactTable";
import useUserStore from "./store";

export default function Home() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  console.log("setUser", user);
  return (
    <div className="mx-5">
      <div className="mt-10" />
      <div className="flex justify-between items-center">
        <p className="text-4xl">홈페이지</p>
        {user ? (
          <div className="flex-col gap-5 text-end">
            <p className="text-sm">{user.username} 님</p>
            <p
              className="text-sm"
              onClick={() => {
                useUserStore.getState().setUser(null);
                localStorage.removeItem("accessToken");
              }}
            >
              로그아웃
            </p>
          </div>
        ) : (
          <div className="flex gap-5">
            <p className="text-sm" onClick={() => router.push("/login")}>
              로그인
            </p>
            <p className="text-sm" onClick={() => router.push("/register")}>
              회원가입
            </p>
          </div>
        )}
      </div>
      <div className="mt-16" />
      <div>
        <p className="text-3xl text-center mb-16">게시판</p>
        <StickyHeadTable />
      </div>
    </div>
  );
}
