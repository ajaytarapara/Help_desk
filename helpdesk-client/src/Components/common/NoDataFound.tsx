import { Box, Typography, useTheme } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

interface NoDataFoundProps {
  title?: string;
  description?: string;
}

const NoDataFound = ({
  title = "No Tickets Found",
  description = "Try adjusting your search or filter to find what you're looking for.",
}: NoDataFoundProps) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="60vh"
      px={2}
    >
      {/* Icon Box */}
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: 4,
          bgcolor: theme.palette.grey[200],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <HourglassEmptyIcon
          sx={{ fontSize: 50, color: theme.palette.grey[600] }}
        />
      </Box>

      {/* Text */}
      <Typography
        variant="h6"
        fontWeight={600}
        color="text.primary"
        gutterBottom
      >
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" maxWidth={350}>
        {description}
      </Typography>
    </Box>
  );
};

export default NoDataFound;
