"use client";
import Header from "./(components)/Header";
import StickyHeadTable from "./(components)/ReactTable";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-16 lg:px-28">
      <div className="mt-10" />
      <Header />
      <div className="mt-16" />
      <div>
        <p className="mb-16 text-center text-3xl">게시판</p>

        <StickyHeadTable />
      </div>
    </div>
  );
}
