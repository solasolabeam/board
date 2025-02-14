"use client";
import { useEffect, useState } from "react";
import Header from "../(components)/Header";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faList,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function WritePage() {
  const [file, setFile] = useState<File | null>(null);
  const [categoryList, setCategoryList] = useState<{ [key: string]: string }>(
    {},
  );
  const [category, setCategory] = useState("NOTICE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  // 클라이언트에서만 useSearchParams 사용하기 위해 useEffect로 감싸기
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // 선택한 파일 저장
    }
  };

  const handleClick = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file); // 파일 추가
    }

    const requestData = JSON.stringify({
      title: title,
      category: category,
      content: content,
    });

    formData.append(
      "request",
      new Blob([requestData], { type: "application/json" }),
    );

    try {
      await fetch(
        `https://front-mission.bigs.or.kr/boards${
          searchParams?.get("id") ? "/" + searchParams.get("id") : ""
        }`,
        {
          method: searchParams?.get("id") ? "PATCH" : "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: formData,
        },
      );
      router.push("/");
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  useEffect(() => {
    const searchCategory = async () => {
      const response = await fetch(
        "https://front-mission.bigs.or.kr/boards/categories",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      );
      const data = await response.json();
      setCategoryList(data);
    };

    const searchData = async () => {
      try {
        const response = await fetch(
          `https://front-mission.bigs.or.kr/boards${
            "/" + searchParams?.get("id")
          }`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          },
        );
        const data = await response.json();
        setCategory(data.boardCategory || "");
        setContent(data.content || "");
        setTitle(data.title || "");
        // setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    searchCategory();
    if (searchParams?.get("id")) {
      searchData();
    }
  }, [searchParams]); // searchParams가 변경될 때마다 실행

  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />
      <div className="mt-16" />
      <div className="flex flex-col gap-4">
        <FormControl>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category || ""}
            label="카테고리"
            onChange={handleChange}
            className="w-1/2"
          >
            {Object.entries(categoryList).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="글 제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="글 내용"
          variant="outlined"
          multiline
          rows={10}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-end gap-4">
          {file && <p>첨부된 파일: {file.name}</p>}
          <Button
            variant="contained"
            component="label"
            sx={{ px: "24px", py: "12px", backgroundColor: "#6b7280" }}
          >
            <FontAwesomeIcon icon={faImage} />
            &nbsp; 파일 첨부
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </div>
      </div>
      <div className="mt-20 flex justify-end gap-2">
        <button
          className="rounded-md bg-gray-400 px-4 py-3 text-white shadow-md transition-all duration-200 hover:bg-gray-400 active:bg-gray-400 active:bg-opacity-80"
          onClick={() => router.push("/")}
        >
          <FontAwesomeIcon icon={faList} />
          &nbsp; 목록
        </button>
        <button
          className="rounded-md px-4 py-3 text-gray-500 shadow-md ring-1 ring-gray-400 transition-all duration-200 active:bg-gray-400 active:bg-opacity-20"
          onClick={handleClick}
        >
          {searchParams?.get("id") ? (
            <>
              <FontAwesomeIcon icon={faPenToSquare} color="#6b7280" />
              &nbsp; 수정
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPenToSquare} color="#6b7280" />
              &nbsp; 저장
            </>
          )}
        </button>
      </div>
    </div>
  );
}
