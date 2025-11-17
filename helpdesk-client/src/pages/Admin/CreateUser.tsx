import { Box, Container, Grid, Typography, MenuItem } from "@mui/material";
import { Send, ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { CustomButton, FormWrapper } from "../../Components/common";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";
import {
  createUserThunk,
  updateUserThunk,
  getUserByIdThunk,
} from "../../features/user/userThunk";
import { ApiResponse } from "../../features/auth/types";
import { useEffect, useState } from "react";
import { UserSchema } from "../../utils/validationSchemaUtils";
import {
  TicketRoot,
  TicketFormCard,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";
import FormField from "../../Components/common/FormField";
import { Routes } from "../../utils/constant";
import { UserListResponse } from "../../features/user/type";
import { getAllRolesThunk } from "../../features/dropDown/dropDownThunk";
import { SelectListItem } from "../../features/dropDown/types";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    roleId: "",
    isActive: "true",
  });

  const [roleList, setRoleList] = useState<SelectListItem[]>([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      const dataRoleApi = await dispatch(getAllRolesThunk());
      const dataRoles = (dataRoleApi.payload as ApiResponse<SelectListItem[]>)
        ?.data;
      setRoleList(dataRoles);
    };

    const fetchUser = async () => {
      const result = await dispatch(getUserByIdThunk(Number(id)));
      const data = (result.payload as ApiResponse<UserListResponse>)?.data;

      if (data) {
        setInitialValues({
          fullName: data.fullName,
          email: data.email,
          roleId: data.roleId.toString(),
          isActive: data.isActive ? "true" : "false",
        });
      }
    };

    fetchUserRoles();
    if (isEditMode) fetchUser();
  }, [id, dispatch, isEditMode]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }) => {
      // Convert string → boolean for API
      const isActiveBoolean = values.isActive === "true";

      let result;

      if (isEditMode) {
        result = await dispatch(
          updateUserThunk({
            userId: Number(id),
            fullName: values.fullName,
            email: values.email,
            roleId: Number(values.roleId),
            isActive: isActiveBoolean,
          })
        );
      } else {
        result = await dispatch(
          createUserThunk({
            fullName: values.fullName,
            email: values.email,
            roleId: Number(values.roleId),
            isActive: isActiveBoolean,
          })
        );
      }

      const data = (result.payload as ApiResponse<any>)?.data;

      if (data) {
        resetForm();
        navigate(Routes.ADMIN_USER_LIST);
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
              {isEditMode ? "Edit User" : "Create User"}
            </Typography>
            <Typography variant="body1" color="#6c757d">
              {isEditMode
                ? "Update the user’s information."
                : "Fill the form to create a new user."}
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TicketFormCard>
            <Grid container spacing={3}>
              {/* Full Name */}
              <Grid item xs={12}>
                <FormField
                  formik={formik}
                  name="fullName"
                  label="Full Name"
                  required
                  placeholder="John Doe"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <FormField
                  formik={formik}
                  name="email"
                  label="Email"
                  required
                  placeholder="example@email.com"
                />
              </Grid>

              {/* Role */}
              <Grid item xs={12} sm={6}>
                <FormField
                  formik={formik}
                  name="roleId"
                  label="Role"
                  select
                  required>
                  {roleList.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.label}
                    </MenuItem>
                  ))}
                </FormField>
              </Grid>

              {/* Status Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormField
                  formik={formik}
                  name="isActive"
                  label="Status"
                  select
                  required>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </FormField>
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <CustomButton variant="outlined" onClick={() => navigate(-1)}>
                    Cancel
                  </CustomButton>

                  <CustomButton
                    variant="contained"
                    type="submit"
                    endIcon={<Send />}>
                    {isEditMode ? "Update User" : "Create User"}
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

export default CreateUser;
