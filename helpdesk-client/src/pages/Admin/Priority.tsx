import { useEffect, useState } from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { ArrowBack, Add, Delete, Mode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";

import {
  getAllPriorityThunk,
  deletePriorityThunk,
} from "../../features/priority/priorityThunk";

import {
  DefaultPageNumber,
  DefaultPageSize,
  Routes,
} from "../../utils/constant";

import {
  TicketRoot,
  TicketHeader,
  TicketTextField,
  TicketSearchBox,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";

import {
  CustomButton,
  DataTable,
  DeleteDialog,
  NoDataFound,
} from "../../Components/common";

import { PaginationResponse } from "../../features/auth/types";
import useDebounce from "../../utils/hooks";

const Priority = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [priorityList, setPriorityList] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(DefaultPageNumber);
  const [totalRow, setTotalRow] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DefaultPageSize);

  const [sortKey, setSortKey] = useState<string>("priorityId");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<number>(0);

  const debouncedSearch = useDebounce(searchValue);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setPage(DefaultPageNumber);
  };

  const handleSort = (key: string | number | symbol) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key.toString());
    setSortOrder(newOrder);
  };

  const getPriorityList = async () => {
    const payload = {
      pageNumber: page,
      pageSize: rowsPerPage,
      search: debouncedSearch,
      orderBy: sortKey,
      isDescending: sortOrder === "desc",
    };

    const response = await dispatch(getAllPriorityThunk(payload));

    const paginationData = (response.payload as PaginationResponse<any>)?.data;

    if (paginationData) {
      setPriorityList(paginationData.items);
      setTotalRow(paginationData.totalCount);
    }
  };

  const handleDelete = async () => {
    await dispatch(deletePriorityThunk(deletedId));
    setPage(DefaultPageNumber);
    getPriorityList();
    setDialogOpen(false);
  };

  useEffect(() => {
    getPriorityList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortKey, sortOrder, rowsPerPage, debouncedSearch]);

  return (
    <TicketRoot>
      <Container maxWidth="xl">
        <TicketHeader>
          <Box display="flex" alignItems="center" gap={2}>
            <BackStyledButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </BackStyledButton>
            <Box>
              <Typography variant="h4" fontWeight={800} color="#1a1a1a">
                Manage Priority
              </Typography>
              <Typography variant="body1" color="#6c757d">
                Manage all Priority Items
              </Typography>
            </Box>
          </Box>

          <CustomButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(Routes.ADMIN_PRIORITY_CREATE)}>
            Create Priority
          </CustomButton>
        </TicketHeader>

        <TicketSearchBox>
          <TicketTextField
            placeholder="Search Priority"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </TicketSearchBox>

        {priorityList.length > 0 ? (
          <DataTable
            data={priorityList}
            totalRows={totalRow}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
            columns={[
              { key: "priorityName", label: "Priority Name", sortable: true },
            ]}
            actions={(row) => (
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/Manage/Priority/Edit/${row.id}`)}>
                  <Mode />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => {
                    setDialogOpen(true);
                    setDeletedId(row.id);
                  }}>
                  <Delete />
                </IconButton>
              </Box>
            )}
          />
        ) : (
          <NoDataFound />
        )}

        <DeleteDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleDelete}
          title="Delete Priority"
          message="Do you want to delete this priority? This action cannot be undone."
        />
      </Container>
    </TicketRoot>
  );
};

export default Priority;
