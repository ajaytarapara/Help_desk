import { Box, Container, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { CustomButton, FormWrapper } from "../../Components/common";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";
import {
  createCategoryThunk,
  getCategoryByIdThunk,
  updateCategoryThunk,
} from "../../features/category/categoryThunk";
import { Routes } from "../../utils/constant";
import {
  TicketRoot,
  TicketFormCard,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";
import { CategorySchema } from "../../utils/validationSchemaUtils";
import { ApiResponse } from "../../features/auth/types";
import { CategoryResponse } from "../../features/category/type";
import FormField from "../../Components/common/FormField";
import { useEffect, useState } from "react";

interface CategoryFormValues {
  categoryName: string;
}

const CreateCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [initialValues, setInitialValues] = useState<CategoryFormValues>({
    categoryName: "",
  });

  // Fetch category details if in edit mode
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      const response = await dispatch(getCategoryByIdThunk(Number(id)));
      const categoryData = (response.payload as ApiResponse<CategoryResponse>)
        ?.data;
      if (categoryData) {
        setInitialValues({ categoryName: categoryData.categoryName });
      }
    };
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: CategorySchema,
    onSubmit: async (values, { resetForm }) => {
      let response;

      if (isEditMode) {
        response = await dispatch(
          updateCategoryThunk({ categoryId: Number(id), payload: values })
        );
      } else {
        response = await dispatch(createCategoryThunk(values));
      }

      const apiResponse = response.payload as ApiResponse<CategoryResponse>;
      if (apiResponse?.success) {
        resetForm();
        navigate(Routes.ADMIN_CATEGORY_LIST);
      }
    },
  });

  return (
    <TicketRoot>
      <Container maxWidth="xl">
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <BackStyledButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </BackStyledButton>
          <Box>
            <Typography variant="h4" fontWeight={800} color="#1a1a1a">
              {isEditMode ? "Edit Category" : "Create New Category"}
            </Typography>
            <Typography variant="body1" color="#6c757d">
              {isEditMode
                ? "Update the category details below."
                : "Add a new category to the system."}
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TicketFormCard>
            <Grid container spacing={3}>
              {/* Category Name */}
              <Grid item xs={12}>
                <FormField
                  formik={formik}
                  name="categoryName"
                  label="Category Name"
                  required
                  placeholder="Enter category name"
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <CustomButton variant="outlined" onClick={() => navigate(-1)}>
                    Cancel
                  </CustomButton>
                  <CustomButton variant="contained" type="submit">
                    {isEditMode ? "Update Category" : "Create Category"}
                  </CustomButton>
                </Box>
              </Grid>
            </Grid>
          </TicketFormCard>
        </FormWrapper>
      </Container>
    </TicketRoot>
  );
};

export default CreateCategory;
