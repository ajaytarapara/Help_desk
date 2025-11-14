import React from "react";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

interface CommonPaginationProps {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: number) => void;
}

const CommonPagination: React.FC<CommonPaginationProps> = ({
  page,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handleChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <Container>
      <RowsPerPageWrapper>
        <span>Rows per page:</span>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          variant="outlined"
        >
          {[5, 10, 25, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </RowsPerPageWrapper>

      <StyledPagination
        page={page}
        count={totalPages}
        color="primary"
        shape="rounded"
        onChange={handleChange}
      />
    </Container>
  );
};

export default CommonPagination;

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "16px",
  padding: "0px 12px",
});

const RowsPerPageWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root.Mui-selected": {
    background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    color: "#fff",
  },
});
