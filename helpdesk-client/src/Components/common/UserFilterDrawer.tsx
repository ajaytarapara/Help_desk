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

interface UserFilterValues {
  roleId: string;
  status: string;
}

interface UserFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filterValues: UserFilterValues;
  setFilterValues: (values: UserFilterValues) => void;
  roleList: SelectListItem[];
}

export const UserFilterDrawer = ({
  open,
  onClose,
  filterValues,
  setFilterValues,
  roleList,
}: UserFilterDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={400} p={3}>
        <FilterTitleBox>
          Filter Users
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </FilterTitleBox>

        <Formik
          initialValues={filterValues}
          enableReinitialize
          onSubmit={(values) => {
            setFilterValues(values);
            onClose();
          }}>
          {({ values, handleChange, resetForm }) => {
            const isAnyFilterSelected =
              values.roleId !== "" || values.status !== "";

            return (
              <Form>
                {/* Role Dropdown */}
                <StyledTextField
                  select
                  label="Role"
                  name="roleId"
                  value={values.roleId}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}>
                  {roleList.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.label}
                    </MenuItem>
                  ))}
                </StyledTextField>

                {/* Status Dropdown */}
                <StyledTextField
                  select
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 3 }}>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </StyledTextField>

                <Box display="flex" gap={2}>
                  <CustomButton
                    variant="outlined"
                    color="secondary"
                    disabled={!isAnyFilterSelected}
                    onClick={() => {
                      resetForm();
                      setFilterValues({ roleId: "", status: "" });
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
  fontSize: 20,
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
