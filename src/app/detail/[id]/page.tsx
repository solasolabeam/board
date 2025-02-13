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
        console.log("data", data);
        setCategory(data.category);
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

      <div className="grid grid-rows-5 grid-cols-[1fr_2fr] gap-6 p-6">
        <div className="flex items-center justify-center text-lg font-bold mb-2">
          카테고리
        </div>
        <div className="flex items-center text-base mb-4">{category}</div>
        <div className="flex items-center justify-center text-lg font-bold mb-2">
          작성일
        </div>
        <div className="flex items-center text-base mb-4">{createdAt}</div>
        <div className="flex items-center justify-center text-lg font-bold mb-2">
          제목
        </div>
        <div className="flex items-center text-base mb-4">{title}</div>
        <div className="flex items-center justify-center text-lg font-bold mb-2">
          내용
        </div>
        <div className="text-base">{content}</div>
        <div className="flex items-center justify-center text-lg font-bold mb-2">
          첨부파일
        </div>
        <div className="flex items-center text-base">
          {imageUrl && (
            <a
              href={`https://front-mission.bigs.or.kr${imageUrl}`}
              download="image.png"
              rel="noopener noreferrer" // 추가하여 보안을 강화!
            >
              <p className="text-blue-500 cursor-pointer">
                {imageUrl.replace("/media/images/", "")}
              </p>
            </a>
          )}
        </div>
      </div>

      <div className="mt-8"></div>

      <div className="flex justify-end gap-2">
        <button className="bg-gray-500 text-white py-3 px-6 rounded-md">
          수정
        </button>
        <button className="bg-gray-500 text-white py-3 px-6 rounded-md">
          삭제
        </button>
        <button
          className="bg-gray-500 text-white py-3 px-6 rounded-md"
          onClick={() => router.push("/")}
        >
          목록
        </button>
      </div>
    </div>
  );
}
