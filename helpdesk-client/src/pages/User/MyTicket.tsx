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
import { getPriorityColor, getStatusColor } from "../../utils/helper";
import {
  deleteTicketThunk,
  getAllTicketThunk,
} from "../../features/ticket/ticketThunk";
import { PaginationResponse } from "../../features/auth/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store";
import {
  TicketAttr,
  TicketPaginationRequest,
} from "../../features/ticket/types";
import {
  DefaultPageNumber,
  DefaultPageSize,
  Routes,
  TicketStatus,
} from "../../utils/constant";
import dayjs from "dayjs";
import { TicketFilterDrawer } from "../../Components/common/TicketFilterDrawer";

// ✅ Import shared styled components
import {
  TicketRoot,
  TicketHeader,
  TicketTextField,
  FilterIconButton,
  TicketSearchBox,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";
import { FilterCountBadge } from "../../Components/common/ui/CommonStyled";

const MyTickets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { priorityList, statusList } = useSelector(
    (state: RootState) => state.dropDown
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [ticketList, setTicketList] = useState<TicketAttr[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValues, setFilterValues] = useState({
    priorityId: "",
    formDate: "",
    statusId: "",
    toDate: "",
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<number>(0);
  const [page, setPage] = useState(DefaultPageNumber);
  const [totalRow, setTotalRow] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DefaultPageSize);
  const [sortKey, setSortKey] = useState<keyof TicketAttr | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setPage(DefaultPageNumber);
  };

  const handleSort = (key: keyof TicketAttr) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
  };

  const getMyTicketList = async () => {
    const requestPayload: TicketPaginationRequest = {
      statusId: +filterValues.statusId,
      priorityId: +filterValues.priorityId,
      fromDate: filterValues.formDate,
      toDate: filterValues.toDate,
      pageNumber: page,
      pageSize: rowsPerPage,
      search: searchValue,
      orderBy: sortKey,
      isDescending: sortOrder === "asc" ? false : true,
    };
    const response = await dispatch(getAllTicketThunk(requestPayload));
    const data = (response.payload as PaginationResponse<TicketAttr>)?.data;
    if (data) {
      setTicketList(data.items);
      setTotalRow(data.totalCount);
    }
  };

  const handleSearch = () => {
    setPage(DefaultPageNumber);
    getMyTicketList();
  };

  const handleDelete = async () => {
    await dispatch(deleteTicketThunk(deletedId));
    getMyTicketList();
    setDialogOpen(false);
  };

  useEffect(() => {
    getMyTicketList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, page, sortKey, sortOrder, rowsPerPage]);

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
                My Tickets
              </Typography>
              <Typography variant="body1" color="#6c757d">
                Manage and track your support tickets
              </Typography>
            </Box>
          </Box>

          <CustomButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(Routes.USER_TICKET_CREATE)}>
            Create New Ticket
          </CustomButton>
        </TicketHeader>

        {/* Search & Filter */}

        <TicketSearchBox>
          <Box>
            <TicketTextField
              placeholder="Search Title"
              fullWidth
              size="small"
              onChange={(event) => setSearchValue(event.target.value)}
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
              onClick={() => setIsFilterOpen(true)}>
              <FilterList />
              {Object.values(filterValues).filter((val) => val).length > 0 && (
                <FilterCountBadge>
                  {Object.values(filterValues).filter((val) => val).length}
                </FilterCountBadge>
              )}
            </FilterIconButton>
          </Box>
        </TicketSearchBox>

        {/* Table or No Data */}
        {ticketList.length > 0 ? (
          <DataTable
            data={ticketList}
            totalRows={totalRow}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
            columns={[
              { key: "title", label: "Title", sortable: true },
              {
                key: "category",
                label: "Category",
                sortable: true,
                render: (_, row) => <Box>{row.category.categoryName}</Box>,
              },
              {
                key: "status",
                label: "Status",
                sortable: true,
                render: (_, row) => (
                  <Chip
                    label={row.status.statusName}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: getStatusColor(row.status.statusName),
                      color: getStatusColor(row.status.statusName),
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                ),
              },
              {
                key: "priority",
                label: "Priority",
                sortable: true,
                render: (_, row) => (
                  <Chip
                    label={row.priority.priorityName}
                    size="small"
                    sx={{
                      backgroundColor: getPriorityColor(
                        row.priority.priorityName
                      ),
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                ),
              },
              {
                key: "assignedTo",
                label: "Assigned Agent",
                render: (_, row) => <Box>{row.assignedTo.fullName || "-"}</Box>,
              },
              {
                key: "createdDate",
                label: "Created On",
                sortable: true,
                render: (_, row) =>
                  dayjs(row.createdDate).format("MMM DD, YYYY"),
              },
            ]}
            actions={(row) => (
              <Box>
                <IconButton
                  onClick={() =>
                    navigate(`/User/Ticket/Detail/${row.ticketId}`)
                  }>
                  <VisibilityOutlined />
                </IconButton>
                <IconButton
                  color="primary"
                  disabled={
                    row.status.statusName.toLowerCase() !==
                    TicketStatus.OPEN.toLowerCase()
                  }
                  onClick={() =>
                    navigate(`/User/Ticket/Update/${row.ticketId}`)
                  }>
                  <Mode />
                </IconButton>
                <IconButton
                  color="error"
                  disabled={
                    row.status.statusName.toLowerCase() ===
                    TicketStatus.INPROGRESS.toLowerCase()
                  }
                  onClick={() => {
                    setDialogOpen(true);
                    setDeletedId(row.ticketId);
                  }}>
                  <Delete />
                </IconButton>
              </Box>
            )}
          />
        ) : (
          <NoDataFound />
        )}

        {/* Filter Drawer */}
        <TicketFilterDrawer
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          priorityList={priorityList}
          statusList={statusList}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleDelete}
          title="Remove Ticket"
          message="Do you really want to remove this ticket? This action cannot be undone."
        />
      </Container>
    </TicketRoot>
  );
};

export default MyTickets;
