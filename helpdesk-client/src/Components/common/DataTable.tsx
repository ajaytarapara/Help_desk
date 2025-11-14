import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
} from "@mui/material";
import CommonPagination from "./CustomPagination";
import styled from "@emotion/styled";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  sortKey?: keyof T;
  sortOrder?: "asc" | "desc";
  onSort?: (key: keyof T) => void;
  rowKey?: keyof T;
}

const DataTable = <T extends Record<string, any>>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    actions,
    page,
    rowsPerPage,
    totalRows,
    onPageChange,
    onRowsPerPageChange,
    sortKey,
    sortOrder,
    onSort,
    rowKey = "id",
  } = props;

  return (
    <StyledPaper sx={{ borderRadius: 2, p: 2, boxShadow: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  align={col.align || "left"}
                  sortDirection={sortKey === col.key ? sortOrder : false}>
                  {col.sortable && onSort ? (
                    <TableSortLabel
                      active={sortKey === col.key}
                      direction={sortKey === col.key ? sortOrder : "asc"}
                      onClick={() => onSort(col.key)}>
                      <Typography fontWeight={600}>{col.label}</Typography>
                    </TableSortLabel>
                  ) : (
                    <Typography fontWeight={600}>{col.label}</Typography>
                  )}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="center" sx={{ minWidth: "155px" }}>
                  <Typography fontWeight={600}>Action</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={row[rowKey] ?? `row-${index}`} hover>
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      align={col.align || "left"}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="center">{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CommonPagination
        page={page}
        totalPages={Math.ceil(totalRows / rowsPerPage)}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(value) => onRowsPerPageChange(value)}
      />
    </StyledPaper>
  );
};

export default DataTable;

const StyledPaper = styled(Paper)({
  background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
  borderRadius: "16px",
  border: "1px solid #bae6fd",
  boxShadow: "0 4px 20px -2px rgba(14,165,233,0.15)",
});
