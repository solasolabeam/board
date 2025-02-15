"use client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Column {
  id: "no" | "title" | "category" | "createdAt" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "no", label: "No.", minWidth: 50, align: "center" },
  { id: "title", label: "제목", minWidth: 100 },
  { id: "category", label: "카테고리", minWidth: 100 },
  {
    id: "createdAt",
    label: "작성일",
    minWidth: 120,
    align: "center",
    format: (value: string) => value.split("T")[0],
  },
  { id: "actions", label: "", align: "center", minWidth: 300 },
];

interface Row {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPage = 10;
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [totalElements, setTotalElements] = React.useState(0);

  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://front-mission.bigs.or.kr/boards?page=${page - 1}&size=10`,
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("accessToken"),
            },
          },
        );

        const data = await response.json();
        setRows(data.content);
        setTotalElements(data.totalElements);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [page]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    event.stopPropagation();
    await fetch(`https://front-mission.bigs.or.kr/boards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + Cookies.get("accessToken"),
      },
    });

    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="px-4 py-3 text-gray-500">
              <FontAwesomeIcon icon={faFile} /> &nbsp; 총{" "}
              <span className="font-bold text-gray-600">{totalElements}</span>건
            </p>
            <button
              className="rounded-md px-4 py-3 text-gray-500 shadow-md ring-1 ring-gray-400 transition-all duration-200 active:bg-gray-400 active:bg-opacity-20"
              onClick={() => router.push("/write")}
            >
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; 글 작성
            </button>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 1100 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#6b7280",
                          color: "#ffffff",
                        }}
                        sx={{
                          // 모바일에서 "actions" 컬럼을 숨기기
                          "@media (max-width: 870px)": {
                            display:
                              column.id == "actions" || column.id == "category"
                                ? "none"
                                : "table-cell",
                          },
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 &&
                    rows
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage,
                      // )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              let value;

                              if (column.id === "no") {
                                value = (page - 1) * rowsPerPage + index + 1; // 행번호 계산
                              } else {
                                value =
                                  row[column.id as keyof typeof row] || "";
                              }
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  onClick={() =>
                                    router.push(`/detail/${row.id}`)
                                  }
                                  className={`cursor-pointer ${
                                    column.id === "no" ? "font-bold" : ""
                                  }`}
                                  sx={{
                                    "@media (max-width: 870px)": {
                                      display:
                                        column.id == "actions" ||
                                        column.id == "category"
                                          ? "none"
                                          : "table-cell",
                                    },
                                  }}
                                >
                                  {column.id === "actions" ? (
                                    <div className="flex justify-center gap-4">
                                      <button
                                        className="rounded-md px-4 py-3 text-gray-500 shadow-md ring-1 ring-gray-400 transition-all duration-200 active:bg-gray-400 active:bg-opacity-20"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          router.push(`/write?id=${row.id}`);
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faPenToSquare}
                                          color="#6b7280"
                                        />
                                        &nbsp; 수정
                                      </button>
                                      <button
                                        className="rounded-md bg-gray-400 px-4 py-3 text-white shadow-md transition-all duration-200 hover:bg-gray-400 active:bg-gray-400 active:bg-opacity-80"
                                        onClick={(event) => {
                                          handleDelete(event, row.id);
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                        &nbsp; 삭제
                                      </button>
                                    </div>
                                  ) : column.format ? (
                                    column.format(String(value))
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Stack
            spacing={2}
            sx={{ mt: 5, flexDirection: "row", justifyContent: "center" }}
          >
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </div>
      )}
    </>
  );
}
