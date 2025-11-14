import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  styled,
} from "@mui/material";

// ---------- Layout ----------
export const AuthRoot = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)",
  padding: "2rem 0",
});

export const AuthStyledCard  = styled(Card)({
  borderRadius: 12,
  boxShadow: "0 10px 40px -5px rgba(14, 165, 233, 0.25)",
  border: "1px solid #e9ecef",
  backgroundColor: "#ffffff",
});

// ---------- Header ----------
export const HeaderBox = styled(Box)({
  textAlign: "center",
  marginBottom: "2rem",
});

export const IconWrapper = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
  marginBottom: "1rem",
  boxShadow: "0 4px 20px -2px rgba(14, 165, 233, 0.15)",
});

export const Title = styled(Typography)({
  fontWeight: 800,
  color: "#1a1a1a",
  marginBottom: "0.5rem",
});

export const Subtitle = styled(Typography)({
  color: "#6c757d",
});

// ---------- Form ----------
export const FormWrapper = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-asterisk": {
    color: "red",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    textAlign:"start",
    "&:hover fieldset": {
      borderColor: "#0ea5e9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0ea5e9",
    },
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #ffffff inset",
    WebkitTextFillColor: "#000000",
    transition: "background-color 5000s ease-in-out 0s",
  },
});

// ---------- Buttons ----------
export const SubmitButton = styled(Button)({
  background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
  color: "#ffffff",
  padding: "12px 0",
  fontSize: "1rem",
  fontWeight: 700,
  borderRadius: 12,
  boxShadow: "0 4px 20px -2px rgba(14, 165, 233, 0.15)",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 40px -5px rgba(14, 165, 233, 0.25)",
  },
});

export const BackToHome = styled(Button)({
  color: "#1a1a1a",
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
});

export const ContactAdmin = styled(Button)({
  color: "#0ea5e9",
  textTransform: "none",
  fontWeight: 700,
  padding: 0,
  minWidth: "auto",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
});

// ---------- Footer ----------
export const Footer = styled(Box)({
  marginTop: "1.5rem",
  textAlign: "center",
});

export const FooterText = styled(Typography)({
  color: "#6c757d",
});
