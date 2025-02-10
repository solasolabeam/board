"use client";
import { useRouter } from "next/navigation";
import StickyHeadTable from "./_components/ReactTable";

export default function Home() {
  const router = useRouter();
  return (
    <div className="mx-5">
      <div className="mt-10" />
      <div className="flex justify-between items-center">
        <p className="text-4xl">홈페이지</p>
        <div className="flex gap-5">
          <p className="text-sm" onClick={() => router.push("/login")}>
            로그인
          </p>
          <p className="text-sm" onClick={() => router.push("/register")}>
            회원가입
          </p>
        </div>
      </div>
      <div className="mt-16" />
      <div>
        <p className="text-3xl text-center mb-16">게시판</p>
        <StickyHeadTable />
      </div>
    </div>
  );
}
