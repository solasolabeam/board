"use client";
import { useEffect, useState } from "react";
import Header from "../(components)/Header";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const [file, setFile] = useState<File | null>(null);
  const [categoryList, setCategoryList] = useState<{ [key: string]: string }>(
    {}
  );
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

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
      category: "NOTICE",
      content: content,
    });

    formData.append(
      "request",
      new Blob([requestData], { type: "application/json" })
    );

    try {
      const response = await fetch("https://front-mission.bigs.or.kr/boards", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Response:", response.status, data);
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
        }
      );
      const data = await response.json();
      console.log("data", data);
      setCategoryList(data);
    };
    searchCategory();
  }, []);
  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />
      <div className="mt-16" />
      <div className="flex flex-col gap-4">
        <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
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
        <div className="flex justify-end items-center gap-4">
          {file && <p>첨부된 파일: {file.name}</p>}
          <Button variant="contained" component="label">
            파일 첨부
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          목록
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
