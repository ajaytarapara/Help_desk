import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  styled,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  LogoutOutlined,
  ConfirmationNumber,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { resetDropDown } from "../../features/dropDown/dropDownSice";
import { Routes } from "../../utils/constant";
import { AppDispatch } from "../../core/store";
import { getUserName } from "../../utils/authUtils";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetDropDown());
    localStorage.removeItem("token");
    navigate(Routes.LOGIN);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        {/* Brand Section */}
        <BrandBox onClick={() => navigate(Routes.USER_DASHBOARD)}>
          <BrandIcon />
          <BrandTitle variant="h6">HelpDesk Portal</BrandTitle>
        </BrandBox>

        {/* Desktop Actions */}
        {!isMobile && (
          <RightBox>
            <UserBox>
              <Avatar
                sx={{
                  bgcolor: "#0ea5e9",
                  width: 32,
                  height: 32,
                  fontSize: "1rem",
                }}>
                {getUserName()?.charAt(0).toUpperCase()}
              </Avatar>
              <BrandTitle variant="body1" fontWeight={600}>
                {getUserName()}
              </BrandTitle>
            </UserBox>

            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} color="primary">
                <LogoutOutlined />
              </IconButton>
            </Tooltip>
          </RightBox>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <>
            <IconButton onClick={handleMenuOpen} color="primary">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}>
              <MenuItem disabled>
                <Typography fontWeight={600}>{getUserName()}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}>
                <LogoutOutlined fontSize="small" style={{ marginRight: 8 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

/* ---------- STYLED COMPONENTS ---------- */

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  borderBottom: "1px solid #e9ecef",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  paddingBlock: theme.spacing(1),
  paddingInline: theme.spacing(2),
}));

const BrandBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
});

const BrandIcon = styled(ConfirmationNumber)({
  fontSize: 28,
  color: "#0ea5e9",
});

const BrandTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "1.25rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

const RightBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));
