"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

interface Column {
  id: "title" | "category" | "createdAt" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "제목", minWidth: 100 },
  { id: "category", label: "카테고리", minWidth: 100 },
  {
    id: "createdAt",
    label: "작성일",
    minWidth: 120,
    align: "center",
    format: (value: string) => value.split("T")[0],
  },
  { id: "actions", label: "기능", align: "center", minWidth: 100 },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  interface Row {
    id: number;
    title: string;
    category: string;
    createdAt: string;
  }

  const [rows, setRows] = React.useState<Row[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://front-mission.bigs.or.kr/boards?page=0&size=10",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );

        if (!response.ok) {
          // 응답 코드가 200번대가 아니면 예외 처리
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        setRows(data.content);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof typeof row] || "";
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => console.log("클릭:", row.id)}
                            className="cursor-pointer"
                          >
                            {column.id === "actions" ? (
                              <div className="flex justify-center">
                                <Button
                                  variant="contained"
                                  color="info"
                                  size="small"
                                  onClick={() => console.log("수정:", row.id)}
                                >
                                  수정
                                </Button>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  size="small"
                                  sx={{ ml: 1 }} // 왼쪽 마진 추가
                                  onClick={() => console.log("삭제:", row.id)}
                                >
                                  삭제
                                </Button>
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="페이지당 행 수"
      />
    </Paper>
  );
}
