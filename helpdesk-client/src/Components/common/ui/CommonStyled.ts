import { Box, Button, IconButton, Typography, styled } from "@mui/material";

export const RootContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  paddingTop: 32,
  paddingBottom: 64,
});

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
}));

export const PageTitle = styled(Typography)({
  fontWeight: 800,
  color: "#1a1a1a",
});

export const SubTitle = styled(Typography)({
  color: "#6c757d",
});

export const SectionTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: 16,
  color: "#1a1a1a",
});

export const StatsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StatsCard = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "statusBgColor" && prop !== "statusBorderColor",
})<{ statusBgColor: string; statusBorderColor: string }>(
  ({ statusBgColor, statusBorderColor, theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    backgroundColor: "#ffffff",
    borderRadius: 12,
    border: `1px solid ${statusBorderColor}`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 10px 40px -5px rgba(14, 165, 233, 0.25)",
    },
  })
);

export const IconWrapper = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 64,
  height: 64,
  borderRadius: 12,
  backgroundColor: bgcolor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StatValue = styled(Typography)({
  fontWeight: 800,
});

export const StatLabel = styled(Typography)({
  color: "#6c757d",
});

export const ActionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
  border: "1px solid #bae6fd",
  borderRadius: 12,
  transition: "transform 0.3s ease",
  "&:hover": { transform: "translateY(-4px)" },
}));

export const QuickActionsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const TicketCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  border: "1px solid #e9ecef",
  "&:hover": { borderColor: "#0ea5e9" },
}));

export const TicketTitle = styled(Typography)({
  fontWeight: 600,
  color: "#1a1a1a",
});

export const TicketDescription = styled(Typography)({
  color: "#6c757d",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  marginBottom: 8,
});

export const TicketDate = styled(Typography)({
  color: "#6c757d",
  "& span": {
    fontWeight: 600,
    color: "#1a1a1a",
  },
});

export const RecentSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const CustomViewButton = styled(Button)({
  height: 44,
  textTransform: "none",
  borderRadius: 8,
  fontWeight: 600,
});

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  position: "relative",
}));

export const FilterCountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -5,
  right: -5,
  backgroundColor: theme.palette.error.main,
  color: "#fff",
  borderRadius: "50%",
  width: 18,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.7rem",
  fontWeight: 600,
}));
