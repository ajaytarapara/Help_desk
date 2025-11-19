import { Box, Container, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { CustomButton, FormWrapper } from "../../Components/common";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";

import {
  createPriorityThunk,
  getPriorityByIdThunk,
  updatePriorityThunk,
} from "../../features/priority/priorityThunk";

import { Routes } from "../../utils/constant";

import {
  TicketRoot,
  TicketFormCard,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";

import { ApiResponse } from "../../features/auth/types";
import { PriorityAttr } from "../../features/priority/types";

import FormField from "../../Components/common/FormField";
import { useEffect, useState } from "react";
import { PrioritySchema } from "../../utils/validationSchemaUtils";

interface PriorityFormValues {
  priorityName: string;
}

const CreatePriority = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [initialValues, setInitialValues] = useState<PriorityFormValues>({
    priorityName: "",
  });

  // Load existing priority details in edit mode
  useEffect(() => {
    const fetchPriority = async () => {
      if (!id) return;

      const response = await dispatch(getPriorityByIdThunk(Number(id)));
      const priorityData = (response.payload as ApiResponse<PriorityAttr>)
        ?.data;

      if (priorityData) {
        setInitialValues({
          priorityName: priorityData.priorityName,
        });
      }
    };

    fetchPriority();
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: PrioritySchema,
    onSubmit: async (values, { resetForm }) => {
      let response;

      if (isEditMode) {
        response = await dispatch(
          updatePriorityThunk({
            priorityId: Number(id),
            ...values,
          })
        );
      } else {
        response = await dispatch(createPriorityThunk(values));
      }

      const apiResponse = response.payload as ApiResponse<string>;

      if (apiResponse?.success) {
        resetForm();
        navigate(Routes.ADMIN_PRIORITY_LIST);
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
              {isEditMode ? "Edit Priority" : "Create New Priority"}
            </Typography>
            <Typography variant="body1" color="#6c757d">
              {isEditMode
                ? "Update the priority details below."
                : "Add a new priority to the system."}
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TicketFormCard>
            <Grid container spacing={3}>
              {/* Priority Name */}
              <Grid item xs={12}>
                <FormField
                  formik={formik}
                  name="priorityName"
                  label="Priority Name"
                  required
                  placeholder="Enter priority name"
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <CustomButton variant="outlined" onClick={() => navigate(-1)}>
                    Cancel
                  </CustomButton>

                  <CustomButton variant="contained" type="submit">
                    {isEditMode ? "Update Priority" : "Create Priority"}
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

export default CreatePriority;
