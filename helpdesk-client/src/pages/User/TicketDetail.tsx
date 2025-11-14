import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Divider, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { getPriorityColor, getStatusColor } from "../../utils/helper";
import TicketComments from "../../Components/common/TicketComment/TicketComment";
import { AppDispatch } from "../../core/store";
import { getTicketDetailThunk } from "../../features/ticket/ticketThunk";
import { TicketAttr } from "../../features/ticket/types";
import { ApiResponse } from "../../features/auth/types";
import {
  TicketRoot,
  BackStyledButton,
  DetailCard,
  DetailTitle,
  StyledDivider,
  DetailLabel,
  DetailValue,
  StatusSummaryCard,
  ColoredStatusBox,
  CommentCard,
  AssigneeAvatar,
} from "../../Components/common/ui/TicketStyled";
import { HeaderBox } from "../../Components/common";

const TicketDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketAttr | null>(null);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      const result = await dispatch(getTicketDetailThunk(Number(id)));
      const data = (result.payload as ApiResponse<TicketAttr>)?.data;
      if (data) setTicket(data);
    };

    if (id) fetchTicketDetail();
  }, [id, dispatch]);

  if (!ticket) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography variant="h6" color="error">
          Ticket not found.
        </Typography>
      </Box>
    );
  }

  const formattedCreatedDate = dayjs(ticket.createdDate).format(
    "DD MMM YYYY, HH:mm"
  );
  const formattedUpdatedDate = ticket.updatedDate
    ? dayjs(ticket.updatedDate).format("DD MMM YYYY, HH:mm")
    : "N/A";

  return (
    <TicketRoot>
      <Container maxWidth="xl">
        {/* Header */}
        <HeaderBox>
          <Box display="flex" alignItems="center" gap={2}>
            <BackStyledButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </BackStyledButton>
            <Typography variant="h4" fontWeight={800} color="#1a1a1a">
              Ticket Details
            </Typography>
          </Box>
        </HeaderBox>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <DetailCard>
              <DetailTitle>{ticket.title}</DetailTitle>
              <StyledDivider />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "#3730a3",
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  mb: 1,
                }}>
                Description
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#1e293b",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: "8px",
                  p: "14px 16px",
                  boxShadow: "0 1px 6px rgba(99,102,241,0.1)",
                  backgroundColor: "#f9fafb",
                }}>
                {ticket.description}
              </Typography>
            </DetailCard>

            {/* Additional Information */}
            <StatusSummaryCard sx={{ mt: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  color: "#0369a1",
                  textTransform: "uppercase",
                  fontSize: "1rem",
                  borderLeft: "4px solid #0284c7",
                  pl: "12px",
                  mb: 2,
                }}>
                Additional Information
              </Typography>
              <Grid container spacing={2}>
                <InfoItem
                  title="Category"
                  value={ticket.category?.categoryName}
                />
                <InfoItem title="Created Date" value={formattedCreatedDate} />
                <InfoItem title="Last Updated" value={formattedUpdatedDate} />
                <InfoItem
                  title="Created By"
                  value={ticket.createdBy?.fullName}
                />
              </Grid>
            </StatusSummaryCard>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <StatusSummaryCard>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "#0369a1",
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  borderLeft: "4px solid #0284c7",
                  pl: "10px",
                  mb: 2,
                }}>
                Assignee
              </Typography>
              {ticket.assignedTo?.id ? (
                <Box display="flex" alignItems="center" gap={2}>
                  <AssigneeAvatar>
                    {ticket.assignedTo.fullName?.charAt(0).toUpperCase()}
                  </AssigneeAvatar>
                  <Box>
                    <Typography fontWeight={700} color="#0f172a">
                      {ticket.assignedTo.fullName}
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                      Assigned Agent
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  textAlign="center"
                  sx={{
                    backgroundColor: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    borderRadius: "12px",
                    p: 3,
                  }}>
                  <Box fontSize={40} color="#94a3b8" mb={1}>
                    👤
                  </Box>
                  <Typography fontWeight={700} color="#475569" mb={0.5}>
                    No Agent Assigned
                  </Typography>
                  <Typography variant="body2" color="#64748b">
                    Waiting for an agent to be assigned.
                  </Typography>
                </Box>
              )}
            </StatusSummaryCard>

            {/* Status Summary */}
            <StatusSummaryCard sx={{ mt: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "#0369a1",
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  borderLeft: "4px solid #0284c7",
                  pl: "10px",
                  mb: 2,
                }}>
                Status Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ColoredStatusBox
                    borderColor={getStatusColor(ticket.status?.statusName)}
                    bgColor={`${getStatusColor(ticket.status?.statusName)}15`}>
                    <DetailLabel>Status</DetailLabel>
                    <DetailValue
                      sx={{
                        color: getStatusColor(ticket.status?.statusName),
                        fontWeight: 700,
                      }}>
                      {ticket.status?.statusName || "N/A"}
                    </DetailValue>
                  </ColoredStatusBox>
                </Grid>
                <Grid item xs={6}>
                  <ColoredStatusBox
                    borderColor={getPriorityColor(
                      ticket.priority?.priorityName
                    )}
                    bgColor={`${getPriorityColor(
                      ticket.priority?.priorityName
                    )}15`}>
                    <DetailLabel>Priority</DetailLabel>
                    <DetailValue
                      sx={{
                        color: getPriorityColor(ticket.priority?.priorityName),
                        fontWeight: 700,
                      }}>
                      {ticket.priority?.priorityName || "N/A"}
                    </DetailValue>
                  </ColoredStatusBox>
                </Grid>
              </Grid>
            </StatusSummaryCard>
          </Grid>

          {/* Comments */}
          <Grid item xs={12}>
            <CommentCard>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#9d174d",
                  textTransform: "uppercase",
                  mb: 2,
                  borderLeft: "4px solid #db2777",
                  pl: "12px",
                }}>
                Comments
              </Typography>
              <Divider sx={{ mb: 3, borderColor: "#cbd5e1" }} />
              <TicketComments ticketId={id ? +id : 0} />
            </CommentCard>
          </Grid>
        </Grid>
      </Container>
    </TicketRoot>
  );
};

export default TicketDetailsPage;

/* -------------------------- SUB COMPONENT --------------------------- */
const InfoItem = ({ title, value }: { title: string; value?: string }) => (
  <Grid item xs={12} sm={6}>
    <DetailLabel>{title}</DetailLabel>
    <DetailValue
      sx={{
        color: value ? "#1e293b" : "#9ca3af",
        fontWeight: value ? 600 : 400,
      }}>
      {value || "N/A"}
    </DetailValue>
  </Grid>
);
