import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Menu, MenuItem, Tooltip } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    //  backgroundColor: "black", // Change the color and opacity here
    backdropFilter: "blur(10px)",
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      //    backgroundColor: "black", // Change the color and opacity here
      backdropFilter: "blur(10px)",
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Change the color to white with opacity
    backdropFilter: open ? "blur(10px)" : "none", // Add backdrop filter when the drawer is open
  },
  boxShadow: "3px 0px 10px 0px rgba(0,0,0,0.3)", // Subtle shadow for depth

  ...(open && {
    ...openedMixin(theme),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Change the color to white with opacity
      backdropFilter: "blur(10px)", // Add backdrop filter when the drawer is open
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Change the color to white with opacity
      backdropFilter: "none", // Remove backdrop filter when the drawer is closed
    },
  }),
}));

export default function CombinedDrawer({ Tittle, currentComponent, routes }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // For account menu

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("role");
    // Redirect to logout or login page
    window.location.href = "/login";
  };
  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const userRole = localStorage.getItem("role");

  // Define sidebar items based on user role
  let sidebarItems = [];
  if (userRole === "admin") {
    sidebarItems = [
      { text: "Add User", icon: <AddCircleOutlineIcon />, route: "/addusers" },
      { text: "View Tasks", icon: <AssignmentIcon />, route: "/admin" },
      { text: "Add Task", icon: <PersonAddIcon />, route: "/Addtask" },
    ];
  } else if (userRole === "user") {
    sidebarItems = [
      { text: "Add Task", icon: <PersonAddIcon />, route: "/Addtask" },
      { text: "View Tasks", icon: <AssignmentIcon />, route: "/Viewtasks" },
    ];
  }
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", background: "#ff5f5" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            display: "-ms-grid",

            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 1,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{}}>
            {routes.find((route) => route.path === window.location.pathname)
              ?.title || "Default Title"}
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={handleAccountMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              getContentAnchorEl={null}
            >
              <MenuItem component={Link} to="/Account" onClick={handleClose}>
                View Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img
            src={"/SmartPoint_AV_Logo.png"}
            alt="Project Icon"
            style={{ width: 150, paddingRight: "20px" }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ marginTop: "2px" }}>
          {sidebarItems.map((item, index) => (
            <Link
              key={item.text}
              to={item.route}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tooltip title={item.text} placement="right">
                <ListItem
                  button
                  disablePadding
                  selected={location.pathname === item.route}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    px: 2.5,
                    py: 0.6,
                    borderRadius: "18px",
                    "&:hover": {
                      backgroundColor: "#A2D2DF", // Hover background color
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#3498db" }}>
                    {item.icon}
                  </ListItemIcon>{" "}
                  {/* Icon color */}
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 10 : 0,
                      marginLeft: "10px",
                      color: "black",
                      fontWeight: "Bold", // Bold text// Text color
                    }}
                  />
                </ListItem>
              </Tooltip>
            </Link>
          ))}
        </List>
        {/* Other sections of the drawer */}

        {/* Other sections of the drawer */}
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2, marginBottom: 10 }}
        style={{}}
      >
        <DrawerHeader />

        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}
