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
          }
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
  }, []);
  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />

      <div className="mt-16" />

      <div className="grid grid-rows-[1fr_1fr_1fr_200px_1fr] grid-cols-[1fr_2fr] gap-6">
        <div className="flex items-center justify-center text-lg font-bold ">
          카테고리
        </div>
        <div className="flex items-center text-base ">{category}</div>
        <div className="flex items-center justify-center text-lg font-bold ">
          작성일
        </div>
        <div className="flex items-center text-base ">
          {createdAt &&
            new Date(createdAt).toISOString().slice(0, 16).replace("T", " ")}
        </div>
        <div className="flex items-center justify-center text-lg font-bold ">
          제목
        </div>
        <div className="flex items-center text-base ">{title}</div>
        <div className="flex items-center justify-center text-lg font-bold ">
          내용
        </div>
        <div className="text-base">{content}</div>
        <div className="flex items-center justify-center text-lg font-bold ">
          첨부파일
        </div>
        <div className="flex items-center text-base">
          {imageUrl && (
            <a
              href={`https://front-mission.bigs.or.kr${imageUrl}`}
              target="_blank"
            >
              <p className="text-blue-500 cursor-pointer">
                {imageUrl.replace("/media/images/", "")}
              </p>
            </a>
          )}
        </div>
      </div>

      <div className="mt-48"></div>

      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-500 text-white py-3 px-6 rounded-md"
          onClick={() => router.push("/")}
        >
          목록
        </button>
        <button
          className="bg-gray-500 text-white py-3 px-6 rounded-md"
          onClick={() => router.push(`/write?id=${params.id}`)}
        >
          수정
        </button>
        <button
          className="bg-gray-500 text-white py-3 px-6 rounded-md"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
