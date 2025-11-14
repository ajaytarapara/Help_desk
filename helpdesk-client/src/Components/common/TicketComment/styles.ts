import { Box, Button, Paper, styled } from "@mui/material";

export const CommentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: "16px",
  backgroundColor: "#fff",
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  position: "relative",
}));

export const EmptyState = styled(Box)({
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#f0f9ff",
  borderRadius: "12px",
  border: "1px dashed #bae6fd",
});

export const ReplyContextBox = styled(Box)(({ theme }) => ({
  borderLeft: `4px solid #db2777`,
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  backgroundColor: "#fef0f4",
  borderRadius: "0 8px 8px 0",
  maxHeight: "70px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#fce7f4",
  },
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "10px",
  padding: "6px 18px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",

  "&.MuiButton-containedPrimary": {
    backgroundColor: "#f472b6",
    "&:hover": {
      backgroundColor: "#ec4899",
      boxShadow: "0 4px 10px rgba(236, 72, 153, 0.35)",
    },
    "&.Mui-disabled": {
      backgroundColor: "#e5e7eb",
      color: "#9ca3af",
      boxShadow: "none",
    },
  },

  "&.MuiButton-outlinedSecondary": {
    borderColor: "#94a3b8",
    color: "#475569",
    "&:hover": {
      borderColor: "#f472b6",
      color: "#f472b6",
      backgroundColor: "rgba(254, 240, 243, 0.6)",
    },
    "&.Mui-disabled": {
      borderColor: "#e5e7eb",
      color: "#9ca3af",
      backgroundColor: "transparent",
    },
  },
}));
