"use client";
import Header from "@/app/(components)/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const params = useParams();
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`https://front-mission.bigs.or.kr/boards/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://front-mission.bigs.or.kr/boards/${params.id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        );
        const data = await response.json();
        setCategory(data.boardCategory);
        setContent(data.content);
        setCreatedAt(data.createdAt);
        setTitle(data.title);
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />

      <div className="mt-16" />

      <div className="grid grid-cols-[1fr_3fr] grid-rows-[1fr_1fr_1fr_minmax(200px,auto)_1fr] gap-1">
        <div className="flex items-center justify-center rounded-md bg-slate-500 text-sm font-bold text-white">
          카테고리
        </div>
        <div className="rounded-mdtext-base flex items-center bg-slate-100 pl-4 text-sm">
          {category}
        </div>
        <div className="flex items-center justify-center rounded-md bg-slate-500 text-sm font-bold text-white">
          작성일
        </div>
        <div className="flex items-center bg-slate-100 pl-4 text-sm">
          {createdAt &&
            new Date(createdAt).toISOString().slice(0, 16).replace("T", " ")}
        </div>
        <div className="flex items-center justify-center rounded-md bg-slate-500 text-sm font-bold text-white">
          제목
        </div>
        <div className="flex items-center bg-slate-100 pl-4 text-sm">
          {title}
        </div>
        <div className="flex items-center justify-center rounded-md bg-slate-500 text-sm font-bold text-white">
          내용
        </div>
        <div className="bg-slate-100 p-4 text-sm">{content}</div>
        <div className="flex items-center justify-center rounded-md bg-slate-500 text-sm font-bold text-white">
          첨부파일
        </div>
        <div className="flex items-center bg-slate-100 p-4 text-sm">
          {imageUrl && (
            <a
              href={`https://front-mission.bigs.or.kr${imageUrl}`}
              target="_blank"
            >
              <p className="cursor-pointer hover:text-blue-500">
                {imageUrl.replace("/media/images/", "")}
              </p>
            </a>
          )}
        </div>
      </div>

      <div className="mt-48"></div>

      <div className="flex justify-end gap-2">
        <button
          className="rounded-md bg-gray-500 px-6 py-3 text-white"
          onClick={() => router.push("/")}
        >
          목록
        </button>
        <button
          className="rounded-md bg-gray-500 px-6 py-3 text-white"
          onClick={() => router.push(`/write?id=${params.id}`)}
        >
          수정
        </button>
        <button
          className="rounded-md bg-gray-500 px-6 py-3 text-white"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
