import { Card, CardContent, CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledCard = styled(Card)({
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
});

interface CustomCardProps extends CardProps {
  children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, ...props }) => (
  <StyledCard {...props}>
    <CardContent sx={{ p: 4, textAlign: "center" }}>{children}</CardContent>
  </StyledCard>
);

export default CustomCard;
