import { styled, Button, Box, Paper } from "@mui/material";

export const EmptyState = styled(Box)(() => ({
  padding: 40,
  borderRadius: 12,
  border: "1px dashed #e2e8f0",
  display: "flex",
  justifyContent: "center",
}));

export const CommentCard = styled(Paper)(() => ({
  padding: "16px 20px",
  borderRadius: "16px",
  background: "linear-gradient(180deg, #fff0f7 0%, #ffffff 100%)",

  border: "1px solid #f9a8d4",

  boxShadow:
    "0 2px 8px rgba(190, 24, 93, 0.12), 0 4px 16px rgba(190, 24, 93, 0.08)",

  transition: "all 0.2s ease",

  "&:hover": {
    boxShadow:
      "0 4px 12px rgba(190, 24, 93, 0.18), 0 8px 20px rgba(190, 24, 93, 0.12)",
    borderColor: "#f472b6",
  },
}));

export const StyledButton = styled(Button)(() => ({
  borderRadius: 12,
  padding: "8px 14px",
  textTransform: "none",
}));

export const ShowMoreButton = styled(Button)(() => ({
  textTransform: "none",
  color: "#7e22ce",
  borderRadius: 8,
  padding: "6px 16px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "rgba(126,34,206,0.08)",
  },
}));

export const ReplyContextBox = styled(Box)(() => ({
  marginTop: 12,
  marginBottom: 6,
  display: "flex",
  gap: 8,
  alignItems: "flex-start",
  cursor: "pointer",
}));
