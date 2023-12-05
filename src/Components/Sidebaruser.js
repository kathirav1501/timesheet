import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Sidebaruser = ({ isDrawerOpen, toggleDrawer }) => {
  console.log("isDrawerOpen:", isDrawerOpen); // Check if isDrawerOpen is received properly

  const routes = {
    // "Add User": "/addusers",
    "View Tasks": "/Viewtasks",
    "Add Task": "/user",
    // Add more routes for other sidebar options if needed
  };

  const iconMap = {
    // "Add User": <AddCircleOutlineIcon sx={{ fontSize: 18 }} />,
    "View Tasks": <AssignmentIcon sx={{ fontSize: 18 }} />,
    "Add Task": <PersonAddIcon sx={{ fontSize: 18 }} />,
    // Add more icon mappings for other sidebar options if needed
  };

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          borderRadius: "0 10px 10px 0", // Adjust border radius here
        },
      }}
    >
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <img
          src={"/logo-new.png"}
          alt="Project Icon"
          style={{ width: 100, height: "auto", paddingTop: "20px" }}
        />
      </div>
      <List>
        {Object.keys(iconMap).map((text, index) => (
          <Link
            key={text}
            to={routes[text]}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              button
              sx={{
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "white",
                },
              }}
              selected={window.location.pathname === routes[text]}
            >
              <ListItemIcon>{iconMap[text]}</ListItemIcon>
              <ListItemText>
                <Typography variant="body2">{text}</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebaruser;
