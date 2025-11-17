import { useEffect, useState } from "react";
import { Box, Container, Typography, Chip, IconButton } from "@mui/material";
import {
  ArrowBack,
  FilterList,
  Add,
  VisibilityOutlined,
  Delete,
  Mode,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  DataTable,
  DeleteDialog,
  NoDataFound,
} from "../../Components/common";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";

import {
  getAllUsersThunk,
  deleteUserThunk,
} from "../../features/user/userThunk";

import {
  DefaultPageNumber,
  DefaultPageSize,
  Routes,
} from "../../utils/constant";

import {
  TicketRoot,
  TicketHeader,
  TicketTextField,
  FilterIconButton,
  TicketSearchBox,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";

import { FilterCountBadge } from "../../Components/common/ui/CommonStyled";
import {
  UserListResponse,
  UserPaginationRequest,
} from "../../features/user/type";
import { PaginationResponse } from "../../features/auth/types";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Data states
  const [userList, setUserList] = useState<UserListResponse[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // Pagination + Sorting
  const [page, setPage] = useState(DefaultPageNumber);
  const [totalRow, setTotalRow] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DefaultPageSize);
  const [sortKey, setSortKey] = useState<keyof UserListResponse | undefined>(
    "userId"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Delete Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<number>(0);

  // Pagination Handlers
  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setPage(DefaultPageNumber);
  };

  const handleSort = (key: keyof UserListResponse) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
  };

  // Fetch User List
  const getUserList = async () => {
    const payload: UserPaginationRequest = {
      pageNumber: page,
      pageSize: rowsPerPage,
      search: searchValue,
      orderBy: sortKey,
      isDescending: sortOrder === "desc",
      isActive: undefined,
    };

    const response = await dispatch(getAllUsersThunk(payload));
    const paginationData = (
      response.payload as PaginationResponse<UserListResponse>
    ).data;

    if (paginationData) {
      setUserList(paginationData.items);
      setTotalRow(paginationData.totalCount);
    }
  };

  const handleSearch = () => {
    setPage(DefaultPageNumber);
    getUserList();
  };

  const handleDelete = async () => {
    await dispatch(deleteUserThunk(deletedId));
    getUserList();
    setDialogOpen(false);
  };

  useEffect(() => {
    getUserList();
  }, [page, sortKey, sortOrder, rowsPerPage]);

  return (
    <TicketRoot>
      <Container maxWidth="xl">
        {/* Header */}
        <TicketHeader>
          <Box display="flex" alignItems="center" gap={2}>
            <BackStyledButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </BackStyledButton>

            <Box>
              <Typography variant="h4" fontWeight={800} color="#1a1a1a">
                Manage Users
              </Typography>
              <Typography variant="body1" color="#6c757d">
                Manage system users and roles
              </Typography>
            </Box>
          </Box>

          <CustomButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(Routes.ADMIN_USER_CREATE)}>
            Create New User
          </CustomButton>
        </TicketHeader>

        {/* Search Box */}
        <TicketSearchBox>
          <Box>
            <TicketTextField
              placeholder="Search User"
              fullWidth
              size="small"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </Box>

          <Box>
            <FilterIconButton color="primary" onClick={handleSearch}>
              <Search />
            </FilterIconButton>
          </Box>

          <Box>
            <FilterIconButton color="primary" disabled>
              <FilterList />
              {/* No filters yet */}
              {false && <FilterCountBadge>0</FilterCountBadge>}
            </FilterIconButton>
          </Box>
        </TicketSearchBox>

        {/* Table */}
        {userList.length > 0 ? (
          <DataTable
            data={userList}
            totalRows={totalRow}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
            columns={[
              { key: "fullName", label: "Full Name", sortable: true },
              { key: "email", label: "Email", sortable: true },
              {
                key: "role",
                label: "Role",
                sortable: true,
                render: (_, row) => <Chip label={row.role} />,
              },
              {
                key: "isActive",
                label: "Status",
                sortable: true,
                render: (_, row) => (
                  <Chip
                    label={row.isActive ? "Active" : "Inactive"}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: row.isActive ? "#2ecc71" : "#e74c3c",
                      color: row.isActive ? "#2ecc71" : "#e74c3c",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                ),
              },
            ]}
            actions={(row) => (
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/Manage/Edit/Users/${row.userId}`)}>
                  <Mode />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => {
                    setDialogOpen(true);
                    setDeletedId(row.userId);
                  }}>
                  <Delete />
                </IconButton>
              </Box>
            )}
          />
        ) : (
          <NoDataFound />
        )}

        {/* Delete Confirmation Dialog */}
        <DeleteDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleDelete}
          title="Delete User"
          message="Do you want to delete this user? This action cannot be undone."
        />
      </Container>
    </TicketRoot>
  );
};

export default Users;
