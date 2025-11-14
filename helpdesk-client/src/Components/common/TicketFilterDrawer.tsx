import {
  Box,
  Drawer,
  IconButton,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { CustomButton } from "../../Components/common";
import { SelectListItem } from "../../features/dropDown/types";
import { filterValidationSchema } from "../../utils/validationSchemaUtils";

interface FilterValues {
  priorityId: string;
  statusId: string;
  formDate: string;
  toDate: string;
}

interface TicketFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filterValues: FilterValues;
  setFilterValues: (values: FilterValues) => void;
  priorityList: SelectListItem[];
  statusList: SelectListItem[];
}

export const TicketFilterDrawer = ({
  open,
  onClose,
  filterValues,
  setFilterValues,
  priorityList,
  statusList,
}: TicketFilterDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={400} p={3}>
        <FilterTitleBox>
          Filter Tickets
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </FilterTitleBox>
        <Formik
          initialValues={filterValues}
          enableReinitialize
          validationSchema={filterValidationSchema}
          onSubmit={(values) => {
            setFilterValues(values);
            onClose();
          }}>
          {({ values, handleChange, resetForm, touched, errors }) => {
            const isAnyFilterSelected =
              values.toDate !== "" ||
              values.priorityId !== "" ||
              values.statusId !== "" ||
              values.formDate !== "";

            return (
              <Form>
                <StyledTextField
                  select
                  label="Priority"
                  name="priorityId"
                  value={values.priorityId}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}>
                  {priorityList.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.label}
                    </MenuItem>
                  ))}
                </StyledTextField>

                <StyledTextField
                  select
                  label="Status"
                  name="statusId"
                  value={values.statusId}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}>
                  {statusList.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.label}
                    </MenuItem>
                  ))}
                </StyledTextField>

                <StyledTextField
                  type="date"
                  label="From Date"
                  name="formDate"
                  value={values.formDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3 }}
                />

                <StyledTextField
                  type="date"
                  label="To Date"
                  name="toDate"
                  value={values.toDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3 }}
                  error={touched.toDate && Boolean(errors.toDate)}
                  helperText={touched.toDate && errors.toDate}
                />

                <Box display="flex" gap={2}>
                  <CustomButton
                    variant="outlined"
                    color="secondary"
                    disabled={!isAnyFilterSelected}
                    onClick={() => {
                      resetForm();
                      setFilterValues({
                        priorityId: "",
                        statusId: "",
                        formDate: "",
                        toDate: "",
                      });
                    }}
                    fullWidth>
                    Reset
                  </CustomButton>
                  <CustomButton
                    variant="contained"
                    type="submit"
                    disabled={!isAnyFilterSelected}
                    fullWidth>
                    Apply Filter
                  </CustomButton>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Drawer>
  );
};

// Styled components
const FilterTitleBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  fontWeight: 600,
  fontSize: 24,
  color: "#0ea5e9",
});

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-asterisk": { color: "red" },
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "&:hover fieldset": { borderColor: "#0ea5e9" },
    "&.Mui-focused fieldset": { borderColor: "#0ea5e9" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0ea5e9" },
});
