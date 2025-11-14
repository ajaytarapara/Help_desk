import { Box, Container, Typography, styled } from "@mui/material";
import CustomCard from "../CustomCard";

// Root wrapper
export const LandingRoot = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
});

// -------------------- HERO SECTION --------------------
export const HeroSection = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(12),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: "#1a1a1a",
  marginBottom: theme.spacing(2),
  fontSize: "3.5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.5rem",
  },
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  color: "#6c757d",
  marginBottom: theme.spacing(4),
}));

export const HeroImage = styled("img")({
  width: "100%",
  borderRadius: 16,
  boxShadow: "0 10px 40px -5px rgba(14, 165, 233, 0.25)",
});

// -------------------- STATS SECTION --------------------
export const StatsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: "#fff",
  borderTop: "1px solid #e9ecef",
}));

export const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: "#0ea5e9",
  marginBottom: theme.spacing(1),
}));

export const StatLabel = styled(Typography)({
  color: "#6c757d",
});

// -------------------- FEATURES SECTION --------------------
export const FeaturesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: "#f8f9fa",
}));

export const FeaturesTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 800,
  marginBottom: theme.spacing(8),
}));

export const LandingStyledCard = styled(CustomCard)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: theme.spacing(3),
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
}));

export const FeatureIcon = styled(Box)(({ theme }) => ({
  color: "#0ea5e9",
  marginBottom: theme.spacing(2),
}));

export const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

export const FeatureDescription = styled(Typography)({
  color: "#6c757d",
});

// -------------------- CTA SECTION --------------------
export const CTASection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
  color: "#fff",
  textAlign: "center",
}));

export const CTATitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
}));

export const CTASubtitle = styled(Typography)(({ theme }) => ({
  opacity: 0.9,
  marginBottom: theme.spacing(4),
}));
