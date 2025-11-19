import { Box, Container, Grid } from "@mui/material";
import {
  SupportAgent,
  Speed,
  Analytics,
  Security,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  LandingRoot,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroImage,
  StatsSection,
  StatValue,
  StatLabel,
  FeaturesSection,
  FeaturesTitle,
  LandingStyledCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  CTASection,
  CTATitle,
  CTASubtitle,
} from "../Components/common";
import { CustomButton } from "../Components/common";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SupportAgent sx={{ fontSize: 48 }} />,
      title: "Efficient Ticket Management",
      description: "Create, track, and resolve support tickets with ease.",
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: "Lightning Fast Response",
      description: "Respond to inquiries faster with intelligent routing.",
    },
    {
      icon: <Analytics sx={{ fontSize: 48 }} />,
      title: "Powerful Analytics",
      description: "Track performance and satisfaction with dashboards.",
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: "Enterprise Security",
      description: "Role-based access and encrypted data storage.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Tickets Resolved" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "2.5hrs", label: "Avg Response Time" },
    { value: "24/7", label: "Support Availability" },
  ];

  return (
    <LandingRoot>
      {/* Hero Section */}
      <HeroSection maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <HeroTitle variant="h1">Transform Your Customer Support</HeroTitle>
            <HeroSubtitle variant="h5">
              Manage tickets efficiently and deliver exceptional experiences.
            </HeroSubtitle>

            <Box display="flex" gap={2} flexWrap="wrap">
              <CustomButton
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/login")}>
                Get Started
              </CustomButton>
              <CustomButton variant="outlined">Learn More</CustomButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <HeroImage
              src="/assets/hero-helpdesk.jpg"
              alt="HelpDesk Dashboard"
            />
          </Grid>
        </Grid>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, i) => (
              <Grid item key={i} xs={6} sm={3} textAlign="center">
                <StatValue variant="h4">{stat.value}</StatValue>
                <StatLabel variant="body1">{stat.label}</StatLabel>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StatsSection>

      {/* Features Section */}
      <FeaturesSection>
        <Container maxWidth="lg">
          <FeaturesTitle variant="h2">Why Choose Our HelpDesk?</FeaturesTitle>

          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid item key={i} xs={12} sm={6} md={3} display="flex">
                <LandingStyledCard>
                  <FeatureIcon>{f.icon}</FeatureIcon>
                  <FeatureTitle variant="h6">{f.title}</FeatureTitle>
                  <FeatureDescription variant="body2">
                    {f.description}
                  </FeatureDescription>
                </LandingStyledCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeaturesSection>

      {/* CTA Section */}
      <CTASection>
        <Container maxWidth="sm">
          <CTATitle variant="h3">Ready to Transform Your Support?</CTATitle>
          <CTASubtitle variant="h6">
            Join thousands of teams delivering exceptional experiences
          </CTASubtitle>
          <CustomButton
            variant="outlined"
            endIcon={<CheckCircle />}
            onClick={() => navigate("/login")}
            sx={{
              bgcolor: "#fff !important",
              color: "#0ea5e9",
              "&:hover": { bgcolor: "#f8f9fa" },
            }}>
            Start Free Trial
          </CustomButton>
        </Container>
      </CTASection>
    </LandingRoot>
  );
};

export default Landing;
