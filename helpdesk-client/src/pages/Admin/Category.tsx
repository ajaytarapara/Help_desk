import { useEffect, useState } from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { ArrowBack, Add, Delete, Mode, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";
import {
  getAllCategoriesThunk,
  deleteCategoryThunk,
} from "../../features/category/categoryThunk";
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
  FilterIconButton,
} from "../../Components/common/ui/TicketStyled";
import {
  CustomButton,
  DataTable,
  DeleteDialog,
  NoDataFound,
} from "../../Components/common";
import { PaginationResponse } from "../../features/auth/types";
import { CategoryResponse } from "../../features/category/type";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(DefaultPageNumber);
  const [totalRow, setTotalRow] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DefaultPageSize);

  const [sortKey, setSortKey] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<number>(0);

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

  const getCategoryList = async () => {
    const payload = {
      pageNumber: page,
      pageSize: rowsPerPage,
      search: searchValue,
      orderBy: sortKey,
      isDescending: sortOrder === "desc",
    };
    const response = await dispatch(getAllCategoriesThunk(payload));
    const paginationData = (
      response.payload as PaginationResponse<CategoryResponse[]>
    )?.data;
    const data = paginationData;
    if (data) {
      setCategoryList(data.items);
      setTotalRow(data.totalCount);
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteCategoryThunk(deletedId));
    setPage(DefaultPageNumber);
    getCategoryList();
    setDialogOpen(false);
  };

  useEffect(() => {
    getCategoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortKey, sortOrder, rowsPerPage]);

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
                Manage Categories
              </Typography>
              <Typography variant="body1" color="#6c757d">
                Manage all Categories
              </Typography>
            </Box>
          </Box>
          <CustomButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(Routes.ADMIN_CATEGORY_CREATE)}>
            Create Category
          </CustomButton>
        </TicketHeader>

        <TicketSearchBox>
          <TicketTextField
            placeholder="Search Category"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getCategoryList()}
          />
          <FilterIconButton color="primary" onClick={getCategoryList}>
            <Search />
          </FilterIconButton>
        </TicketSearchBox>

        {categoryList.length > 0 ? (
          <DataTable
            data={categoryList}
            totalRows={totalRow}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
            columns={[
              { key: "categoryName", label: "Category Name", sortable: true },
            ]}
            actions={(row) => (
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/Manage/Category/Edit/${row.id}`)}>
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
          title="Delete Category"
          message="Do you want to delete this category? This action cannot be undone."
        />
      </Container>
    </TicketRoot>
  );
};

export default Category;
