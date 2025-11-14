import { Container, Box, CardContent } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoot, AuthStyledCard, BackToHome } from "../common";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <AuthRoot>
      <Container maxWidth="sm">
        <AuthStyledCard>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>{children}</CardContent>
        </AuthStyledCard>
        <Box textAlign="center" mt={3}>
          <BackToHome onClick={() => navigate("/")}>← Back to Home</BackToHome>
        </Box>
      </Container>
    </AuthRoot>
  );
};

export default AuthLayout;
