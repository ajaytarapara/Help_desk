import { styled, Button, Card, Box } from "@mui/material";

export const EmptyState = styled(Box)(() => ({
  padding: 40,
  borderRadius: 12,
  border: "1px dashed #e2e8f0",
  display: "flex",
  justifyContent: "center",
}));

export const CommentCard = styled(Card)(() => ({
  padding: 16,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  marginBottom: 8,
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
