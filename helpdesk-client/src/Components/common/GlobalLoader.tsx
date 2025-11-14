import { styled } from "@mui/material";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store";

const GlobalLoader = () => {
  const loading = useSelector((state: RootState) => state.ui.loading);

  if (!loading) return null;
  return (
    <LoaderOverlay>
      <LoaderContent>
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "#0ea5e9",
          }}
        />
      </LoaderContent>
    </LoaderOverlay>
  );
};

export default GlobalLoader;

const LoaderOverlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
});

const LoaderContent = styled(Box)({
  backgroundColor: "#ffffff",
  borderRadius: 16,
  padding: 32,
  boxShadow: "0 10px 40px -5px rgba(14, 165, 233, 0.25)",
});
