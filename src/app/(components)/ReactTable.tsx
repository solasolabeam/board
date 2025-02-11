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

const rows = [
  {
    id: 5,
    title: "공지1",
    category: "NOTICE",
    createdAt: "2024-11-11T09:29:45.721114",
  },
  {
    id: 6,
    title: "공지2",
    category: "NOTICE",
    createdAt: "2024-11-11T09:42:12.11129",
  },
  {
    id: 12,
    title: "공지3",
    category: "NOTICE",
    createdAt: "2024-11-13T09:13:07.432346",
  },
  {
    id: 13,
    title: "공지4",
    category: "NOTICE",
    createdAt: "2024-11-13T09:13:34.721977",
  },
  {
    id: 15,
    title: "공지5",
    category: "NOTICE",
    createdAt: "2024-11-13T10:41:39.424863",
  },
  {
    id: 16,
    title: "공지6",
    category: "NOTICE",
    createdAt: "2024-11-13T10:43:26.716577",
  },
  {
    id: 17,
    title: "공지7",
    category: "NOTICE",
    createdAt: "2024-11-13T10:45:15.267487",
  },
  {
    id: 18,
    title: "공지8",
    category: "NOTICE",
    createdAt: "2024-11-13T10:46:29.278927",
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof typeof row] || "";
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "actions" ? (
                            <div className="flex">
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="페이지당 행 수"
      />
    </Paper>
  );
}
