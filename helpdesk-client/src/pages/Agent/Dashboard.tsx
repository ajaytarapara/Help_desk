"use client";

import React, { useEffect, useState } from "react";
import { Box, Chip, Container, Grid, styled, Typography } from "@mui/material";
import {
  CheckCircle,
  HourglassEmpty,
  Assignment,
  ViewList,
  Timer,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAgentAvgResolutionTime,
  getAllHighPriorityTicketThunk,
  ticketSummary,
} from "../../features/ticket/ticketThunk";
import { Routes } from "../../utils/constant";
import { ApiResponse } from "../../features/auth/types";
import { TicketAttr } from "../../features/ticket/types";
import dayjs from "dayjs";
import { getPriorityColor, getStatusColor } from "../../utils/helper";
import {
  RootContainer,
  HeaderBox,
  PageTitle,
  SubTitle,
  SectionTitle,
  StatsCard,
  StatsSection,
  IconWrapper,
  StatValue,
  StatLabel,
  ActionCard,
  TicketCard,
  TicketTitle,
  TicketDescription,
  TicketDate,
  QuickActionsSection,
  RecentSection,
} from "../../Components/common/ui/CommonStyled";
import { CustomButton, CustomCard } from "../../Components/common";
import { AppDispatch } from "../../core/store";
import { useAppSelector } from "../../core/store/hooks";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const avgTime = useAppSelector((state) => state.ticket.avgResolutionTime);
  const ticketSummaryRes = useAppSelector(
    (state) => state.ticket.ticketStatusSummary
  );

  const [ticketList, setTicketList] = useState<TicketAttr[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      await dispatch(getAgentAvgResolutionTime());
      await dispatch(ticketSummary());
      const res = await dispatch(getAllHighPriorityTicketThunk());
      const data = (res.payload as ApiResponse<TicketAttr[]>)?.data;
      if (data) setTicketList(data);
    };
    fetchTickets();
  }, [dispatch]);

  const stats = [
    {
      icon: <Assignment sx={{ fontSize: 40 }} />,
      title: "Open",
      value: ticketSummaryRes.open,
      color: "#0ea5e9",
      bgColor: "#e0f2fe",
    },
    {
      icon: <HourglassEmpty sx={{ fontSize: 40 }} />,
      title: "In Progress",
      value: ticketSummaryRes.inProgress,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      icon: <CheckCircle sx={{ fontSize: 40 }} />,
      title: "Closed",
      value: ticketSummaryRes.closed,
      color: "#10b981",
      bgColor: "#d1fae5",
    },
    {
      icon: <Timer sx={{ fontSize: 40 }} />,
      title: "Avg. Resolution Time",
      value: avgTime + "h",
      color: "#06b6d4",
      bgColor: "#cffafe",
    },
  ];

  return (
    <RootContainer>
      <Container maxWidth="xl">
        {/* Header */}
        <HeaderBox>
          <Box>
            <PageTitle variant="h4">Agent Dashboard</PageTitle>
            <SubTitle variant="body1">
              Manage your assigned tickets and track your performance.
            </SubTitle>
          </Box>
        </HeaderBox>

        {/* Stats Section */}
        <StatsSection>
          <Grid container spacing={3}>
            {stats.map((s, i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
                <StatsCard
                  statusBgColor={s.bgColor}
                  statusBorderColor={s.color}>
                  <IconWrapper bgcolor={s.bgColor}>
                    <Box sx={{ color: s.color }}>{s.icon}</Box>
                  </IconWrapper>
                  <Box flex={1}>
                    <StatValue variant="h4" color={s.color}>
                      {s.value}
                    </StatValue>
                    <StatLabel variant="body2">{s.title}</StatLabel>
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
            <Grid item xs={12} sm={6}>
              <ActionCard component={CustomCard}>
                <Assignment sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  All Tickets
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  View and manage all tickets
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.AGENT_ALL_TICKET_LIST)}>
                  Browse
                </CustomButton>
              </ActionCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <ActionCard component={CustomCard}>
                <ViewList sx={{ fontSize: 32, color: "#0ea5e9", mb: 1 }} />
                <Typography variant="h6" fontWeight={600}>
                  My Assigned Tickets
                </Typography>
                <Typography variant="body2" color="#6c757d" mb={2}>
                  View all assigned tickets
                </Typography>
                <CustomButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => navigate(Routes.AGENT_MY_TICKET)}>
                  View All
                </CustomButton>
              </ActionCard>
            </Grid>
          </Grid>
        </QuickActionsSection>

        {/* High Priority Tickets */}
        <RecentSection>
          <SectionTitle variant="h5">High Priority Tickets</SectionTitle>

          {ticketList && ticketList.length > 0 ? (
            <Grid container spacing={2}>
              {ticketList.slice(0, 5).map((ticket) => {
                const createdAt = dayjs(ticket.createdDate).format(
                  "DD MMM YYYY"
                );
                return (
                  <Grid item xs={12} key={ticket.ticketId}>
                    <TicketCard>
                      <Box flex={1}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          mb={1}
                          flexWrap="wrap">
                          <TicketTitle variant="h6">{ticket.title}</TicketTitle>

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
                            }}
                          />
                          <Chip
                            label={ticket.priority.priorityName}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(
                                ticket.priority.priorityName
                              ),
                              color: "#fff",
                              fontWeight: 600,
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
                          navigate(`/Agent/Ticket/Detail/${ticket.ticketId}`)
                        }>
                        View
                      </CustomViewButton>
                    </TicketCard>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <StatsCard
              statusBgColor={"#e0f2fe"}
              statusBorderColor={"#0ea5e9"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              textAlign="center"
              height="150px">
              <Typography variant="h6" fontWeight={600}>
                No High Priority Tickets Found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Great! There are currently no pending high-priority issues.
              </Typography>
            </StatsCard>
          )}
        </RecentSection>
      </Container>
    </RootContainer>
  );
};

export default AgentDashboard;

const CustomViewButton = styled(CustomButton)({
  height: "44px",
});
