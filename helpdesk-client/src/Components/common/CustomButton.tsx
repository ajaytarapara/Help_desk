import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled((props: ButtonProps) => <Button {...props} />)(
  ({ theme }) => ({
    borderRadius: "12px",
    padding: "12px 32px",
    fontSize: "1.05rem",
    fontWeight: 600,
    textTransform: "none",
    transition: "all 0.3s ease",
    boxShadow: "none",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    "&.MuiButton-contained": {
      background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
      color: "#fff",
      boxShadow: "0 10px 40px -5px rgba(14,165,233,0.25)",
      "&:hover": {
        boxShadow: "0 0 40px rgba(6,182,212,0.3)",
      },
      "&.Mui-disabled": {
        color: "#00000042",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        background: "#9e9e9e42",
        border: "1px solid rgba(70, 70, 70, 0.26)",
        boxShadow: "none",
      },
    },
    "&.MuiButton-outlined": {
      borderColor: "#0ea5e9",
      color: "#0ea5e9",
      borderWidth: 2,
      "&:hover": {
        backgroundColor: "rgba(14,165,233,0.05)",
      },
      "&.Mui-disabled": {
        color: "#00000042",
        borderColor: "rgba(0, 0, 0, 0.12)",
        border: "1px solid #00000042",
        boxShadow: "none",
      },
    },
  })
);

export default CustomButton;
