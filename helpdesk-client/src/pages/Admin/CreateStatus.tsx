import { Box, Container, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { CustomButton, FormWrapper } from "../../Components/common";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";

import {
  createStatusThunk,
  getStatusByIdThunk,
  updateStatusThunk,
} from "../../features/status/statusThunk";

import { Routes } from "../../utils/constant";

import {
  TicketRoot,
  TicketFormCard,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";

import { ApiResponse } from "../../features/auth/types";
import { StatusAttr } from "../../features/status/types";

import FormField from "../../Components/common/FormField";
import { useEffect, useState } from "react";
import { StatusSchema } from "../../utils/validationSchemaUtils";

interface StatusFormValues {
  statusName: string;
}

const CreateStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [initialValues, setInitialValues] = useState<StatusFormValues>({
    statusName: "",
  });

  // Load status details if editing
  useEffect(() => {
    const fetchStatus = async () => {
      if (!id) return;

      const response = await dispatch(getStatusByIdThunk(Number(id)));
      const statusData = (response.payload as ApiResponse<StatusAttr>)?.data;

      if (statusData) {
        setInitialValues({
          statusName: statusData.statusName,
        });
      }
    };

    fetchStatus();
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: StatusSchema,
    onSubmit: async (values, { resetForm }) => {
      let response;

      if (isEditMode) {
        response = await dispatch(
          updateStatusThunk({
            statusId: Number(id),
            ...values,
          })
        );
      } else {
        response = await dispatch(createStatusThunk(values));
      }

      const apiResponse = response.payload as ApiResponse<string>;

      if (apiResponse?.success) {
        resetForm();
        navigate(Routes.ADMIN_STATUS_LIST);
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
              {isEditMode ? "Edit Status" : "Create New Status"}
            </Typography>

            <Typography variant="body1" color="#6c757d">
              {isEditMode
                ? "Update the status details below."
                : "Add a new status to the system."}
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TicketFormCard>
            <Grid container spacing={3}>
              {/* Status Name */}
              <Grid item xs={12}>
                <FormField
                  formik={formik}
                  name="statusName"
                  label="Status Name"
                  required
                  placeholder="Enter status name"
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <CustomButton variant="outlined" onClick={() => navigate(-1)}>
                    Cancel
                  </CustomButton>

                  <CustomButton variant="contained" type="submit">
                    {isEditMode ? "Update Status" : "Create Status"}
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

export default CreateStatus;
