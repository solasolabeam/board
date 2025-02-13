"use client";
import Header from "./(components)/Header";
import StickyHeadTable from "./(components)/ReactTable";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />
      <div className="mt-16" />
      <div>
        <p className="text-3xl text-center mb-16">게시판</p>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-3 rounded-md text-xs"
            onClick={() => router.push("/write")}
          >
            글 작성
          </button>
        </div>
        <StickyHeadTable />
      </div>
    </div>
  );
}
