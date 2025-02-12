"use client";
import Header from "@/app/(components)/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const params = useParams();
  const [category, setBoardCategory] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
        setBoardCategory(data.category);
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
      <div className="border-t-2 border-b border-black border-b-gray-300 py-9">
        <p className="text-center text-xl">{title}</p>
      </div>
      <div className="py-4 h-[500px] overflow-hidden border-b-2 border-black">
        {content}
      </div>
      <div className="mt-8"></div>
      <button className="bg-gray-500 text-white p-3 rounded-md">수정</button>
      <button className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-500">
        버튼 텍스트
      </button>
    </div>
  );
}
