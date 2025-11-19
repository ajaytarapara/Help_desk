import { Box, Container, Grid, Typography, styled, Chip } from "@mui/material";
import {
  ConfirmationNumber,
  CheckCircle,
  HourglassEmpty,
  Group,
  Settings,
  Assessment,
  SupervisorAccount,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomCard } from "../../Components/common";
import { Routes } from "../../utils/constant";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: <ConfirmationNumber sx={{ fontSize: 40 }} />,
      title: "Total Tickets",
      value: "248",
      color: "#0ea5e9",
      bgColor: "#e0f2fe",
    },
    {
      icon: <HourglassEmpty sx={{ fontSize: 40 }} />,
      title: "Open Tickets",
      value: "45",
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      icon: <Group sx={{ fontSize: 40 }} />,
      title: "Active Agents",
      value: "12",
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      title: "Resolved Today",
      value: "38",
      color: "#10b981",
      bgColor: "#d1fae5",
    },
  ];

  const recentTickets = [
    {
      id: "TKT-001",
      title: "Login Issues on Mobile App",
      priority: "High",
      status: "Open",
      agent: "John Agent",
      date: "2025-11-03",
    },
    {
      id: "TKT-002",
      title: "Payment Gateway Integration",
      priority: "Medium",
      status: "In Progress",
      agent: "Sarah Agent",
      date: "2025-11-02",
    },
    {
      id: "TKT-003",
      title: "UI Bug on Dashboard",
      priority: "Low",
      status: "Open",
      agent: "Unassigned",
      date: "2025-11-01",
    },
    {
      id: "TKT-004",
      title: "Feature Request: Dark Mode",
      priority: "Medium",
      status: "Closed",
      agent: "Mike Agent",
      date: "2025-10-30",
    },
  ];

  const agentPerformance = [
    {
      name: "John Agent",
      assigned: 15,
      resolved: 12,
      pending: 3,
      rating: "4.8",
    },
    {
      name: "Sarah Agent",
      assigned: 12,
      resolved: 10,
      pending: 2,
      rating: "4.9",
    },
    {
      name: "Mike Agent",
      assigned: 18,
      resolved: 15,
      pending: 3,
      rating: "4.7",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#dc2626";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6c757d";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "#f59e0b";
      case "In Progress":
        return "#06b6d4";
      case "Closed":
        return "#10b981";
      default:
        return "#6c757d";
    }
  };

  return (
    <Root>
      <Container maxWidth="xl">
        {/* Header */}
        <Header>
          <Box>
            <WelcomeTitle variant="h4">Admin Dashboard</WelcomeTitle>
            <WelcomeSubtitle variant="body1">
              Monitor system performance and manage your support team.
            </WelcomeSubtitle>
          </Box>
          <CustomButton
            variant="contained"
            startIcon={<Settings />}
            onClick={() => navigate("Settings")}>
            System Settings
          </CustomButton>
        </Header>

        {/* Stats Cards */}
        <StatsSection>
          <Grid container spacing={3}>
            {stats.map((stat, i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
                <StatsCard>
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
            <Grid item xs={12} sm={6} md={3}>
              <ActionCard>
                <SupervisorAccount
                  sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }}
                />
                <Typography variant="h6" fontWeight={600}>
                  Manage Users
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  Update, Add and Delete Users
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.ADMIN_USER_LIST)}>
                  Manage
                </CustomButton>
              </ActionCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ActionCard>
                <Assessment sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Categories
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  View All Categories
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.ADMIN_CATEGORY_LIST)}>
                  View
                </CustomButton>
              </ActionCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ActionCard>
                <ConfirmationNumber
                  sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }}
                />
                <Typography variant="h6" fontWeight={600}>
                  Priority
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  Manage Priority
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.ADMIN_PRIORITY_LIST)}>
                  View All
                </CustomButton>
              </ActionCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ActionCard>
                <Settings sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  Status
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  Manage Status
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.ADMIN_STATUS_LIST)}>
                  View All
                </CustomButton>
              </ActionCard>
            </Grid>
          </Grid>
        </QuickActionsSection>

        {/* Agent Performance */}
        <PerformanceSection>
          <SectionTitle variant="h5">Agent Performance</SectionTitle>
          <Grid container spacing={2}>
            {agentPerformance.map((agent, i) => (
              <Grid item key={i} xs={12} md={4}>
                <AgentCard>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    {agent.name}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="#6c757d">
                      Assigned:
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {agent.assigned}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="#6c757d">
                      Resolved:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#10b981">
                      {agent.resolved}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="#6c757d">
                      Pending:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#f59e0b">
                      {agent.pending}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={2}
                    pt={2}
                    borderTop="1px solid #e9ecef">
                    <Typography variant="body2" color="#6c757d">
                      Rating:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="#0ea5e9">
                      ⭐ {agent.rating}
                    </Typography>
                  </Box>
                </AgentCard>
              </Grid>
            ))}
          </Grid>
        </PerformanceSection>

        {/* Recent Tickets */}
        <RecentSection>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}>
            <SectionTitle variant="h5">Recent Tickets</SectionTitle>
            <CustomButton variant="outlined" size="small">
              View All
            </CustomButton>
          </Box>

          <Grid container spacing={2}>
            {recentTickets.map((ticket, i) => (
              <Grid item key={i} xs={12}>
                <TicketCard>
                  <Box flex={1}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      mb={1}
                      flexWrap="wrap">
                      <TicketId variant="body2">{ticket.id}</TicketId>
                      <Chip
                        label={ticket.priority}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(ticket.priority),
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />
                      <Chip
                        label={ticket.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(ticket.status),
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />
                    </Box>
                    <TicketTitle variant="h6">{ticket.title}</TicketTitle>
                    <Box display="flex" gap={2}>
                      <TicketDate variant="body2">
                        Agent: {ticket.agent}
                      </TicketDate>
                      <TicketDate variant="body2">{ticket.date}</TicketDate>
                    </Box>
                  </Box>
                  <CustomButton variant="outlined" size="small">
                    View
                  </CustomButton>
                </TicketCard>
              </Grid>
            ))}
          </Grid>
        </RecentSection>
      </Container>
    </Root>
  );
};

export default AdminDashboard;

// Styled Components
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

const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  height: "100%",
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
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const PerformanceSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const AgentCard = styled(CustomCard)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
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

const TicketId = styled(Typography)({
  fontWeight: 700,
  color: "#0ea5e9",
  fontFamily: "monospace",
});

const TicketTitle = styled(Typography)({
  fontWeight: 600,
  color: "#1a1a1a",
  marginBottom: 4,
});

const TicketDate = styled(Typography)({
  color: "#6c757d",
  fontSize: "0.875rem",
});
