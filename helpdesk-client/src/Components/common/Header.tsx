import React, { useState } from "react";
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
  List,
  ListItemIcon,
  Drawer,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  LogoutOutlined,
  ConfirmationNumber,
  Menu as MenuIcon,
  Dashboard,
  People,
  Category,
  TrackChanges,
  Flag,
  Assignment,
  FormatListBulleted,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetDropDown } from "../../features/dropDown/dropDownSice";
import { Roles, Routes } from "../../utils/constant";
import { AppDispatch, RootState } from "../../core/store";
import { logoutUser } from "../../features/auth/authThunk";

const drawerWidth = 240;

const getMenuItemsByRole = (role: string) => {
  const menuConfig: Record<string, any[]> = {
    Admin: [
      {
        title: "Dashboard",
        icon: <Dashboard />,
        route: Routes.ADMIN_DASHBOARD,
      },
      {
        title: "User",
        icon: <People />,
        route: Routes.ADMIN_USER_LIST,
      },
      {
        title: "Category",
        icon: <Category />,
        route: Routes.ADMIN_CATEGORY_LIST,
      },
      {
        title: "Status",
        icon: <TrackChanges />,
        route: Routes.ADMIN_STATUS_LIST,
      },
      {
        title: "Priority",
        icon: <Flag />,
        route: Routes.ADMIN_PRIORITY_LIST,
      },
    ],

    Agent: [
      {
        title: "Dashboard",
        icon: <Dashboard />,
        route: Routes.AGENT_DASHBOARD,
      },
      {
        title: "All Tickets",
        icon: <Assignment />,
        route: Routes.AGENT_ALL_TICKET_LIST,
      },
      {
        title: "Assigned Tickets",
        icon: <FormatListBulleted />,
        route: Routes.AGENT_MY_TICKET,
      },
    ],

    User: [
      { title: "Dashboard", icon: <Dashboard />, route: Routes.USER_DASHBOARD },
      {
        title: "My Tickets",
        icon: <FormatListBulleted />,
        route: Routes.USER_MY_TICKET_LIST,
      },
    ],
  };

  return menuConfig[role] || menuConfig["User"];
};

const Header = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileSideBar = useMediaQuery("(max-width:900px)");
  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const currentPath = useLocation();
  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(resetDropDown());
    navigate(Routes.LOGIN);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const menuItems = getMenuItemsByRole(user?.role || Roles.USER);
  const SidebarContent = (
    <SidebarContainer>
      <List>
        {menuItems.map((item) => {
          const isSelected =
            currentPath.pathname === item.route ||
            currentPath.pathname.startsWith(item.route + "/");

          return (
            <ListItemButton
              key={item.title}
              onClick={() => {
                navigate(item.route);
                if (isMobileSideBar) setOpen(false);
              }}
              sx={{
                background: isSelected
                  ? "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)"
                  : "transparent",
                ":hover": {
                  backgroundColor: "#cbe1eb",
                },
              }}>
              <StyledListItemIcon
                sx={{ color: isSelected ? "#fff" : "#0ea5e9" }}>
                {item.icon}
              </StyledListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: isSelected ? "#fff" : "#0ea5e9",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </SidebarContainer>
  );

  return (
    <Box>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#06b6d4" }}
            onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
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
                  {user?.fullName?.charAt(0).toUpperCase()}
                </Avatar>
                <BrandTitle variant="body1" fontWeight={600}>
                  {user?.fullName}
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
                  <Typography fontWeight={600}>{user?.fullName}</Typography>
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
      {isMobileSideBar ? (
        <Drawer open={open} onClose={() => setOpen(false)}>
          {SidebarContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            position: "fixed",
            top: 64,
            left: 0,
            height: "calc(100% - 64px)",
          }}>
          {SidebarContent}
        </Box>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isMobileSideBar ? 0 : `${drawerWidth}px`,
          width: "100%",
          background: "#fafafa",
          maxWidth: isMobileSideBar ? "unset" : `calc(100% - ${drawerWidth}px)`,
        }}>
        {children}
      </Box>
    </Box>
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

const SidebarContainer = styled(Box)({
  width: drawerWidth,
  height: "100%",
  background: "#fff",
  borderRight: "1px solid rgb(126, 214, 230)",
});
const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: "36px",
});
