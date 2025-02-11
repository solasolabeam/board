"use client";
import Header from "./(components)/Header";
import StickyHeadTable from "./(components)/ReactTable";

export default function Home() {
  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />
      <div className="mt-16" />
      <div>
        <p className="text-3xl text-center mb-16">게시판</p>
        <StickyHeadTable />
      </div>
    </div>
  );
}
