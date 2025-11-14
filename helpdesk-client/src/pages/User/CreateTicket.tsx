import { Box, Container, Grid, Typography, MenuItem } from "@mui/material";
import { Send, ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { CustomButton, FormWrapper } from "../../Components/common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store";
import {
  createTicketThunk,
  getTicketDetailThunk,
  updateUserTicketThunk,
} from "../../features/ticket/ticketThunk";
import { ApiResponse } from "../../features/auth/types";
import { Ticket, TicketAttr } from "../../features/ticket/types";
import { Routes } from "../../utils/constant";
import { useEffect, useState } from "react";
import { TicketSchema } from "../../utils/validationSchemaUtils";
import {
  TicketRoot,
  TicketFormCard,
  BackStyledButton,
} from "../../Components/common/ui/TicketStyled";
import FormField from "../../Components/common/FormField";

const CreateTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { priorityList, categoryList } = useSelector(
    (state: RootState) => state.dropDown
  );

  const [ticketInitialValue, setTicketInitialValue] = useState<Ticket>({
    title: "",
    categoryId: "",
    priorityId: "",
    description: "",
  });

  // ✅ Fetch ticket detail if in edit mode
  useEffect(() => {
    const fetchTicketDetail = async () => {
      const result = await dispatch(getTicketDetailThunk(Number(id)));
      const data = (result.payload as ApiResponse<TicketAttr>)?.data;
      if (data)
        setTicketInitialValue({
          title: data.title,
          categoryId: data.category.id,
          priorityId: data.priority.id,
          description: data.description,
        });
    };

    if (id) fetchTicketDetail();
  }, [id, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: ticketInitialValue,
    validationSchema: TicketSchema,
    onSubmit: async (values, { resetForm }) => {
      const action = isEditMode
        ? updateUserTicketThunk({
            title: values.title,
            description: values.description,
            priorityId: Number(values.priorityId),
            categoryId: Number(values.categoryId),
            ticketId: id ? +id : 0,
          })
        : createTicketThunk({
            title: values.title,
            description: values.description,
            priorityId: Number(values.priorityId),
            categoryId: Number(values.categoryId),
          });

      const response = await dispatch(action);
      const data = (response.payload as ApiResponse<Ticket>)?.data;

      if (data) {
        resetForm();
        navigate(Routes.USER_MY_TICKET_LIST);
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
              {isEditMode ? "Edit" : "Create New"} Ticket
            </Typography>
            <Typography variant="body1" color="#6c757d">
              {isEditMode
                ? "Update the details of your support ticket below."
                : "Fill out the form below to submit a support ticket."}
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TicketFormCard>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <FormField
                  formik={formik}
                  name="title"
                  label="Ticket Title"
                  required
                  placeholder="Brief description of your issue"
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} sm={6}>
                <FormField
                  formik={formik}
                  name="categoryId"
                  label="Category"
                  select
                  required>
                  {categoryList.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </FormField>
              </Grid>

              {/* Priority */}
              <Grid item xs={12} sm={6}>
                <FormField
                  formik={formik}
                  name="priorityId"
                  label="Priority"
                  select
                  required>
                  {priorityList.map((priority) => (
                    <MenuItem key={priority.id} value={priority.id}>
                      {priority.label}
                    </MenuItem>
                  ))}
                </FormField>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <FormField
                  formik={formik}
                  name="description"
                  label="Description"
                  multiline
                  rows={6}
                  required
                  inputProps={{ maxLength: 500 }}
                  placeholder="Provide detailed information about your issue..."
                />
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    fontWeight: 500,
                    paddingRight: 1,
                    fontSize: 16,
                  }}>
                  {formik.values.description.length}/500
                </Typography>
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
                    {isEditMode ? "Update Ticket" : "Submit Ticket"}
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

export default CreateTicket;
