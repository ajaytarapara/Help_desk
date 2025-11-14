import {
  Box,
  Container,
  Grid,
  Typography,
  styled,
  Chip,
  alpha,
} from "@mui/material";
import {
  ConfirmationNumber,
  CheckCircle,
  HourglassEmpty,
  Cancel,
  Add,
  ViewList,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomCard } from "../../Components/common";
import { getUserName } from "../../utils/authUtils";
import {
  DefaultPageNumber,
  DefaultPageSize,
  Routes,
} from "../../utils/constant";
import { getStatusColor, getPriorityColor } from "../../utils/helper";
import {
  TicketAttr,
  TicketPaginationRequest,
} from "../../features/ticket/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/store";
import { getAllTicketThunk } from "../../features/ticket/ticketThunk";
import { ApiResponse, PaginationResponse } from "../../features/auth/types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getTicketUserSummaryThunk } from "../../features/dropDown/dropDownThunk";
import { TicketUserSummary } from "../../features/dropDown/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [ticketList, setTicketList] = useState<TicketAttr[]>([]);
  const [ticketSummary, setTicketSummary] = useState<TicketUserSummary>();
  const stats = [
    {
      icon: <ConfirmationNumber sx={{ fontSize: 40 }} />,
      title: "Total Tickets",
      value: ticketSummary?.totalTicket,
      color: "#0ea5e9",
      bgColor: "#e0f2fe",
    },
    {
      icon: <HourglassEmpty sx={{ fontSize: 40 }} />,
      title: "Open Tickets",
      value: ticketSummary?.open,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      title: "In Progress",
      value: ticketSummary?.inProgress,
      color: "#06b6d4",
      bgColor: "#cffafe",
    },
    {
      icon: <Cancel sx={{ fontSize: 40 }} />,
      title: "Closed",
      value: ticketSummary?.closed,
      color: "#10b981",
      bgColor: "#d1fae5",
    },
  ];

  const getMyTicketList = async () => {
    const requestPayload: TicketPaginationRequest = {
      pageNumber: DefaultPageNumber,
      pageSize: DefaultPageSize,
    };
    const response = await dispatch(getAllTicketThunk(requestPayload));
    const data = (response.payload as PaginationResponse<TicketAttr>)?.data;
    if (data) {
      setTicketList(data.items);
    }
  };

  const getUserTicketSummary = async () => {
    const response = await dispatch(getTicketUserSummaryThunk());
    const data = (response.payload as ApiResponse<TicketUserSummary>)?.data;
    setTicketSummary(data);
  };

  useEffect(() => {
    getMyTicketList();
    getUserTicketSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Root>
      <Container maxWidth="xl">
        {/* Header */}
        <Header>
          <Box>
            <WelcomeTitle variant="h4">
              Welcome back, {getUserName()} !
            </WelcomeTitle>
            <WelcomeSubtitle variant="body1">
              Here's what's happening with your tickets today.
            </WelcomeSubtitle>
          </Box>
          <CustomButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(Routes.USER_TICKET_CREATE)}>
            Create New Ticket
          </CustomButton>
        </Header>

        {/* Stats Cards */}
        <StatsSection>
          <Grid container spacing={3}>
            {stats.map((stat, i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
                <StatsCard
                  statusBgColor={stat.bgColor}
                  statusBorderColor={stat.color}>
                  <IconWrapper bgcolor={stat.bgColor}>
                    <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  </IconWrapper>
                  <Box flex={1}>
                    <StatValue variant="h4" color={stat.color}>
                      {stat.value}
                    </StatValue>
                    <StatLabel variant="body2">{stat.title}</StatLabel>
                  </Box>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </StatsSection>

        {/* Quick Actions */}
        <QuickActionsSection>
          <SectionTitle variant="h5">Quick Actions</SectionTitle>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <ActionCard>
                <Add sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  New Ticket
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  Create a new support ticket
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.USER_TICKET_CREATE)}>
                  Create
                </CustomButton>
              </ActionCard>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <ActionCard>
                <ViewList sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  My Tickets
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  View all your tickets
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.USER_MY_TICKET_LIST)}>
                  View All
                </CustomButton>
              </ActionCard>
            </Grid>
          </Grid>
        </QuickActionsSection>

        {/* Recent Tickets */}
        <RecentSection>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}>
            <SectionTitle variant="h5">Recent Tickets</SectionTitle>
          </Box>

          <Grid container spacing={2}>
            {ticketList.length > 0 ? (
              ticketList.slice(0, 5).map((ticket, i) => {
                const createdAt = dayjs(ticket.createdDate).format(
                  "DD MMM YYYY"
                );

                return (
                  <Grid item key={ticket.ticketId || i} xs={12}>
                    <TicketCard>
                      <Box flex={1}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          mb={1}
                          flexWrap="wrap">
                          <TicketTitle variant="h6">{ticket.title}</TicketTitle>

                          {/* Status Chip */}
                          <Chip
                            label={ticket.status.statusName}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: getStatusColor(
                                ticket.status.statusName
                              ),
                              color: getStatusColor(ticket.status.statusName),
                              fontWeight: 600,
                              fontSize: "0.75rem",
                            }}
                          />

                          {/* Priority Chip */}
                          <Chip
                            label={ticket.priority.priorityName}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(
                                ticket.priority.priorityName
                              ),
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                            }}
                          />
                        </Box>

                        <TicketDescription>
                          {ticket.description}
                        </TicketDescription>

                        <TicketDate variant="body2">
                          Created On: <span>{createdAt}</span>
                        </TicketDate>
                      </Box>

                      <CustomViewButton
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityOutlined />}
                        onClick={() =>
                          navigate(`/User/Ticket/Detail/${ticket.ticketId}`)
                        }>
                        View
                      </CustomViewButton>
                    </TicketCard>
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12}>
                <TicketCard
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 150,
                    textAlign: "center",
                  }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#6c757d", fontWeight: 500 }}>
                    🎟️ No tickets raised yet.
                  </Typography>
                </TicketCard>
              </Grid>
            )}
          </Grid>
        </RecentSection>
      </Container>
    </Root>
  );
};

export default Dashboard;

const Root = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  paddingTop: 32,
  paddingBottom: 64,
});

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const WelcomeTitle = styled(Typography)({
  fontWeight: 800,
  color: "#1a1a1a",
  marginBottom: 4,
});

const WelcomeSubtitle = styled(Typography)({
  color: "#6c757d",
});

const StatsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StatsCard = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "statusBgColor" && prop !== "statusBorderColor",
})<{ statusBgColor: string; statusBorderColor: string }>(
  ({ statusBgColor, statusBorderColor, theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px -2px rgba(14, 165, 233, 0.15)",
    background: `linear-gradient(180deg, ${alpha(
      statusBgColor,
      0.25
    )} 0%, #ffffff 100%)`,
    border: `1px solid  ${statusBorderColor}`,
    transition:
      "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    "&:hover": {
      transform: "translateY(-6px) scale(1.02)",
      boxShadow: "0 10px 40px -5px rgba(14, 165, 233, 0.25)",
    },
  })
);

const IconWrapper = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: 64,
  height: 64,
  borderRadius: 12,
  backgroundColor: bgcolor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StatValue = styled(Typography)({
  fontWeight: 800,
  marginBottom: 4,
});

const StatLabel = styled(Typography)({
  color: "#6c757d",
  fontSize: "0.875rem",
});

const QuickActionsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: "#1a1a1a",
}));

const ActionCard = styled(CustomCard)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
  border: "1px solid #bae6fd",
  boxShadow: "0 4px 20px -2px rgba(14,165,233,0.15)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const RecentSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const TicketCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e9ecef",
  boxShadow: "0 4px 20px -2px rgba(14, 165, 233, 0.15)",
  transition:
    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",
    boxShadow: "0 10px 40px -5px rgba(14, 165, 233, 0.25)",
    borderColor: "#0ea5e9",
  },
}));

const TicketTitle = styled(Typography)({
  fontWeight: 600,
  color: "#1a1a1a",
  marginBottom: 4,
});

const TicketDate = styled(Typography)({
  color: "#6c757d",
  fontSize: "0.875rem",
  "& span": {
    color: "#1a1a1a",
    fontWeight: 600,
  },
});

const CustomViewButton = styled(CustomButton)({
  height: "44px",
});

const TicketDescription = styled(Typography)(({ theme }) => ({
  color: "#6c757d",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginBottom: "10px",
  maxWidth: "60vw",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "85vw",
  },
}));
