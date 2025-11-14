import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { motion } from "framer-motion";

const LoadingFallback: React.FC = () => {
  return (
    <Root>
      <LogoContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}>
        <LogoCircle>HD</LogoCircle>
      </LogoContainer>

      <Title variant="h6">Help Desk Portal</Title>
      <Subtitle variant="body2">Preparing your experience...</Subtitle>

      <ShimmerContainer
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </Root>
  );
};

export default LoadingFallback;

/* ---------------- Styled Components ---------------- */

const Root = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f0f9ff 0%, #ecfeff 100%)",
  fontFamily: '"Inter", "Roboto", sans-serif',
});

const LogoContainer = styled(motion.div)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LogoCircle = styled(Box)({
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "linear-gradient(145deg, #06b6d4, #0ea5e9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  color: "#fff",
  fontWeight: 700,
  letterSpacing: "1px",
  boxShadow: "0 8px 20px rgba(14,165,233,0.25)",
});

const Title = styled(Typography)({
  marginTop: 24,
  fontWeight: 700,
  letterSpacing: "0.5px",
  color: "#0f172a",
});

const Subtitle = styled(Typography)({
  color: "#64748b",
  marginTop: 8,
});

const ShimmerContainer = styled(motion.div)({
  marginTop: 32,
  width: 180,
  height: 6,
  borderRadius: 4,
  background: "#e2e8f0",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "50%",
    background: "linear-gradient(90deg, #bae6fd 0%, #0ea5e9 100%)",
    animation: "shimmerMove 1.4s ease-in-out infinite",
  },
  "@keyframes shimmerMove": {
    "0%": { left: "-50%" },
    "100%": { left: "100%" },
  },
});
