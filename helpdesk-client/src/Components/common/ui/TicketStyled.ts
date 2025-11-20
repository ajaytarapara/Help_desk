import {
  Box,
  Typography,
  Divider,
  IconButton,
  Avatar,
  TextField,
  styled,
} from "@mui/material";
import CustomCard from "../CustomCard";

/* ----------------------------- COMMON LAYOUT ----------------------------- */

export const TicketRoot = styled(Box)(() => ({
  minHeight: "calc(100vh - 65px)",
  backgroundColor: "#f8fafc",
  paddingTop: 32,
  paddingBottom: 64,
}));

export const TicketHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
}));

export const BackStyledButton = styled(IconButton)(() => ({
  backgroundColor: "#e0f2fe",
  color: "#0284c7",
  "&:hover": {
    backgroundColor: "#bae6fd",
  },
}));

export const TicketTextField = styled(TextField)(() => ({
  "& .MuiInputLabel-asterisk": { color: "red" },
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    textAlign: "start",
    "&:hover fieldset": { borderColor: "#0ea5e9" },
    "&.Mui-focused fieldset": { borderColor: "#0ea5e9" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0ea5e9" },
}));

export const TicketFormCard = styled(CustomCard)(({ theme }) => ({
  padding: theme.spacing(4),
  background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
  border: "1px solid #bae6fd",
  boxShadow: "0 4px 20px -2px rgba(14,165,233,0.15)",
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(3) },
}));

/* --------------------------- MY TICKET PAGE --------------------------- */

export const TicketSearchBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 4,
  marginBottom: 16,
}));

export const FilterIconButton = styled(IconButton)(() => ({
  "& svg": { fontSize: "24px" },
  color: "#0ea5e9",
  border: "1px solid #c5c3c3ff",
  borderRadius: "8px",
}));

/* ------------------------- DETAIL PAGE SECTIONS ------------------------ */

export const DetailCard = styled(Box)(() => ({
  background: "linear-gradient(180deg, #eef2ff 0%, #ffffff 100%)",
  border: "1px solid #c7d2fe",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 4px 20px -2px rgba(99,102,241,0.15)",
}));

export const DetailTitle = styled(Typography)(() => ({
  fontWeight: 800,
  fontSize: "1.5rem",
  color: "#1e1b4b",
}));

export const StyledDivider = styled(Divider)(() => ({
  margin: "16px 0",
  borderColor: "#c7d2fe",
}));

export const DetailLabel = styled(Typography)(() => ({
  fontWeight: 600,
  color: "#64748b",
  textTransform: "uppercase",
  fontSize: "0.7rem",
}));

export const DetailValue = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: "0.95rem",
}));

export const StatusSummaryCard = styled(Box)(() => ({
  background: "linear-gradient(180deg, #ecfeff 0%, #ffffff 100%)",
  borderRadius: "16px",
  border: "1px solid #99f6e4",
  padding: "20px",
  boxShadow: "0 4px 20px -2px rgba(13,148,136,0.15)",
}));

export const ColoredStatusBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})(({ borderColor, bgColor }: { borderColor: string; bgColor: string }) => ({
  backgroundColor: bgColor || "#f1f5f9",
  borderLeft: `4px solid ${borderColor || "#94a3b8"}`,
  borderRadius: "10px",
  padding: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
}));

export const CommentCard = styled(Box)(() => ({
  background: "linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)",
  borderRadius: "16px",
  border: "1px solid #fbcfe8",
  padding: "20px",
  boxShadow: "0 4px 20px -2px rgba(190, 24, 93, 0.15)",
  marginBottom: "16px",
  marginTop: 24,
}));

export const AssigneeAvatar = styled(Avatar)(() => ({
  width: 56,
  height: 56,
  backgroundColor: "#0284c7",
  color: "#fff",
  fontWeight: 700,
}));
