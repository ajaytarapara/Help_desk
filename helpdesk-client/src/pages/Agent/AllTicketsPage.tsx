"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography, IconButton, Chip } from "@mui/material";
import { ArrowBack, FilterList, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getPriorityColor, getStatusColor } from "../../utils/helper";
import {
  getAllTicketThunk,
  updateAgentTicketThunk,
} from "../../features/ticket/ticketThunk";
import { PaginationResponse } from "../../features/auth/types";
import { AppDispatch, RootState } from "../../core/store";
import {
  TicketAttr,
  TicketPaginationRequest,
} from "../../features/ticket/types";
import { DefaultPageNumber, DefaultPageSize } from "../../utils/constant";
import { ChipMenu, DataTable, NoDataFound } from "../../Components/common";
import { TicketFilterDrawer } from "../../Components/common/TicketFilterDrawer";
import {
  TicketRoot,
  TicketSearchBox,
  TicketTextField,
  FilterIconButton,
} from "../../Components/common/ui/TicketStyled";
import { FilterCountBadge } from "../../Components/common/ui/CommonStyled";
import useDebounce from "../../utils/hooks";
import { getAllAgentThunk } from "../../features/dropDown/dropDownThunk";

const AllTickets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { priorityList, statusList, agentList } = useSelector(
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
  const [page, setPage] = useState(DefaultPageNumber);
  const [totalRow, setTotalRow] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DefaultPageSize);
  const [sortKey, setSortKey] = useState<keyof TicketAttr | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const debouncedValue = useDebounce(searchValue);
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

  const getAllAgent = async () => {
    await dispatch(getAllAgentThunk());
  };
  useEffect(() => {
    getMyTicketList();
    getAllAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, page, sortKey, sortOrder, rowsPerPage, debouncedValue]);

  const handleAgentSelect = async (ticketId: number, agentId: number) => {
    await dispatch(
      updateAgentTicketThunk({
        ticketId,
        assignedToId: agentId,
      })
    );
    await getMyTicketList();
  };

  const handleStatusChange = async (ticketId: number, statusId: number) => {
    await dispatch(
      updateAgentTicketThunk({
        ticketId,
        statusId,
      })
    );
    await getMyTicketList();
  };

  return (
    <TicketRoot>
      <Container maxWidth="xl">
        {/* --------------------------- HEADER --------------------------- */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                All Tickets
              </Typography>
              <Typography color="#6c757d">
                View and manage all tickets
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* --------------------------- SEARCH + FILTER --------------------------- */}

        <TicketSearchBox>
          <Box>
            <TicketTextField
              placeholder="Search Title"
              fullWidth
              size="small"
              onChange={(event) => setSearchValue(event.target.value)}
            />
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

        {/* --------------------------- DATA TABLE --------------------------- */}
        {ticketList.length > 0 ? (
          <Box>
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
                  render: (_, row: TicketAttr) => (
                    <Box component="span">{row.category.categoryName}</Box>
                  ),
                },
                {
                  key: "status",
                  label: "Status",
                  sortable: true,
                  render: (_, row: TicketAttr) => (
                    <ChipMenu
                      label={row.status.statusName}
                      color={getStatusColor(row.status.statusName)}
                      disableMenu={
                        row.assignedTo.id !== Number(user?.userId ?? 0) ||
                        row.status.statusName.toLowerCase() === "closed"
                      }
                      disabledLabels={["Open"]}
                      options={statusList}
                      onSelect={(id) => handleStatusChange(row.ticketId, id)}
                    />
                  ),
                },
                {
                  key: "priority",
                  label: "Priority",
                  sortable: true,
                  render: (_, row: TicketAttr) => (
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
                  sortable: true,
                  render: (_, row: TicketAttr) => (
                    <ChipMenu
                      label={row.assignedTo.fullName}
                      options={agentList}
                      disableMenu={
                        row.status.statusName.toLowerCase() === "closed"
                      }
                      onSelect={(id) => handleAgentSelect(row.ticketId, id)}
                    />
                  ),
                },
                {
                  key: "createdBy",
                  label: "Created By",
                  sortable: true,
                  render: (_, row: TicketAttr) => (
                    <Box component="span">{row.createdBy.fullName || "-"}</Box>
                  ),
                },
                {
                  key: "createdDate",
                  label: "Created On",
                  sortable: true,
                  render: (_, row: TicketAttr) =>
                    dayjs(row.createdDate).format("MMM DD, YYYY"),
                },
              ]}
              actions={(row) => (
                <Box>
                  <IconButton
                    onClick={() =>
                      navigate(`/Agent/Ticket/Detail/${row.ticketId}`)
                    }>
                    <VisibilityOutlined className="h-4 w-4 mr-2" />
                  </IconButton>
                </Box>
              )}
            />
          </Box>
        ) : (
          <NoDataFound />
        )}

        {/* --------------------------- FILTER DRAWER --------------------------- */}
        <TicketFilterDrawer
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          priorityList={priorityList}
          statusList={statusList}
        />
      </Container>
    </TicketRoot>
  );
};

export default AllTickets;
