"use client";
import Header from "@/app/(components)/Header";
import {
  faList,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

export default function DetailPage() {
  const params = useParams();
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    await fetch(`https://front-mission.bigs.or.kr/boards/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + Cookies.get("accessToken"),
      },
    });

    toast.success("삭제되었습니다!");
    setTimeout(() => {
      router.push("/list");
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://front-mission.bigs.or.kr/boards/${params.id}`,
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("accessToken"),
            },
          },
        );

        if (response.status == 401) {
          router.push("/login?error=unauthorized");
          return;
        }

        const data = await response.json();
        setCategory(data.boardCategory);
        setContent(data.content);
        setCreatedAt(data.createdAt);
        setTitle(data.title);
        setImageUrl(data.imageUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-16 lg:px-28">
      <div className="mt-10" />
      <Header />

      <div className="mt-16" />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="grid grid-cols-[1fr_3fr] grid-rows-[minmax(50px,auto)_minmax(50px,auto)_minmax(50px,auto)_minmax(400px,auto)_minmax(50px,auto)] gap-1 lg:grid-cols-[1fr_5fr] 2xl:grid-cols-[1fr_7fr]">
            <div className="flex items-center justify-center rounded-md bg-gray-700 text-sm font-bold text-white">
              카테고리
            </div>
            <div className="rounded-mdtext-base flex items-center bg-gray-100 pl-4 text-sm">
              {category}
            </div>
            <div className="flex items-center justify-center rounded-md bg-gray-700 text-sm font-bold text-white">
              작성일
            </div>
            <div className="flex items-center bg-gray-100 pl-4 text-sm">
              {createdAt &&
                new Date(createdAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
            </div>
            <div className="flex items-center justify-center rounded-md bg-gray-700 text-sm font-bold text-white">
              제목
            </div>
            <div className="flex items-center bg-gray-100 pl-4 text-sm">
              {title}
            </div>
            <div className="flex items-center justify-center rounded-md bg-gray-700 text-sm font-bold text-white">
              내용
            </div>
            <div className="bg-gray-100 p-4 text-sm">{content}</div>
            <div className="flex items-center justify-center rounded-md bg-gray-700 text-sm font-bold text-white">
              첨부파일
            </div>
            <div className="flex items-center bg-gray-100 p-4 text-sm">
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
          <div className="mt-12"></div>

          <div className="flex justify-end gap-2">
            <button
              className="rounded-md bg-gray-400 px-4 py-3 text-white shadow-md transition-all duration-200 hover:bg-gray-400 active:bg-gray-400 active:bg-opacity-80"
              onClick={() => router.push("/list")}
            >
              <FontAwesomeIcon icon={faList} />
              &nbsp; 목록
            </button>
            <button
              className="rounded-md px-4 py-3 text-gray-500 shadow-md ring-1 ring-gray-400 transition-all duration-200 active:bg-gray-400 active:bg-opacity-20"
              onClick={() => router.push(`/write?id=${params.id}`)}
            >
              <FontAwesomeIcon icon={faPenToSquare} color="#6b7280" />
              &nbsp; 수정
            </button>
            <button
              className="rounded-md px-4 py-3 text-gray-500 shadow-md ring-1 ring-gray-400 transition-all duration-200 active:bg-gray-400 active:bg-opacity-20"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
              &nbsp; 삭제
            </button>
          </div>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
    </div>
  );
}
