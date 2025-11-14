import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import styled from "@emotion/styled";
import CustomButton from "./CustomButton";

interface DeleteDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog = ({
  open,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  onClose,
  onConfirm,
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>
        <Box fontWeight={600} flex={1}>
          {title}
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Typography variant="body1">{message}</Typography>
      </StyledDialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <StyledCancelCustomButton onClick={onClose} variant="outlined">
          Cancel
        </StyledCancelCustomButton>
        <StyledCustomButton onClick={onConfirm} variant="contained">
          Delete
        </StyledCustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderBottom: "1px solid #e2e8f0",
  padding: "10px 16px",
  color: "#1a1a1a",
});

const StyledCustomButton = styled(CustomButton)({
  height: "40px",
  borderRadius: "8px",
});

const StyledDialogContent = styled(DialogContent)({
  marginTop: "10px",
});

const StyledCancelCustomButton = styled(CustomButton)({
  height: "40px",
  borderRadius: "8px",
  "&.MuiButton-outlined": {
    borderColor: "#6c757d",
    color: "#6c757d",
    borderWidth: 1,
    "&:hover": {
      backgroundColor: "rgba(14,165,233,0.05)",
    },
  },
  fontWeight: 500,
});
