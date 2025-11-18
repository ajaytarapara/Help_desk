import { useEffect, useState } from "react";
import { Box, Container, Typography, Chip, IconButton } from "@mui/material";
import {
  ArrowBack,
  FilterList,
  Add,
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
import { getAllRolesThunk } from "../../features/dropDown/dropDownThunk";

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
import { UserFilterDrawer } from "../../Components/common/UserFilterDrawer";

import { SelectListItem } from "../../features/dropDown/types";
import {
  UserListResponse,
  UserPaginationRequest,
} from "../../features/user/type";
import { PaginationResponse, ApiResponse } from "../../features/auth/types";

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

  // Dialogs
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<number>(0);

  // Filters
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [roleList, setRoleList] = useState<SelectListItem[]>([]);
  const [userFilters, setUserFilters] = useState({
    roleId: "",
    status: "",
  });

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

  // Fetch roles for filter dropdown
  const fetchUserRoles = async () => {
    const response = await dispatch(getAllRolesThunk());
    const data = (response.payload as ApiResponse<SelectListItem[]>)?.data;
    if (data) setRoleList(data);
  };

  // Fetch Users with filters, pagination, and search
  const getUserList = async () => {
    const payload: UserPaginationRequest = {
      pageNumber: page,
      pageSize: rowsPerPage,
      search: searchValue,
      orderBy: sortKey,
      isDescending: sortOrder === "desc",
      roleId: userFilters.roleId ? Number(userFilters.roleId) : undefined,
      isActive:
        userFilters.status === "true"
          ? true
          : userFilters.status === "false"
          ? false
          : undefined,
    };

    const response = await dispatch(getAllUsersThunk(payload));
    const paginationData = (
      response.payload as PaginationResponse<UserListResponse>
    )?.data;
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
    setPage(DefaultPageNumber);
    getUserList();
    setDialogOpen(false);
  };

  useEffect(() => {
    fetchUserRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortKey, sortOrder, rowsPerPage, userFilters]);

  // Count of applied filters
  const filterCount = Object.values(userFilters).filter((v) => v).length;

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
                Manage system users and their roles
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

        {/* Search & Filter */}
        <TicketSearchBox>
          <Box>
            <TicketTextField
              placeholder="Search User"
              fullWidth
              size="small"
              value={searchValue}
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
            <FilterIconButton
              color="primary"
              onClick={() => setFilterDrawerOpen(true)}>
              <FilterList />
              {filterCount > 0 && (
                <FilterCountBadge>{filterCount}</FilterCountBadge>
              )}
            </FilterIconButton>
          </Box>
        </TicketSearchBox>

        <UserFilterDrawer
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          filterValues={userFilters}
          setFilterValues={(filters) => {
            setUserFilters(filters);
            setPage(DefaultPageNumber);
          }}
          roleList={roleList}
        />

        {/* Users Table */}
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
