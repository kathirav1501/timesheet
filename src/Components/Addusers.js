import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Button,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebaradmin from "./Sidebaradmin";

const Addusers = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [roleID, setRoleID] = useState(0);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch projects from API
    axios
      .post("https://localhost:44307/GetAllProjects")
      .then((response) => {
        const projectsData = response.data.data || [];
        setProjects(projectsData);
        if (projectsData.length > 0) {
          setSelectedProject(projectsData[0].projectID.toString());
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleCreateUser = () => {
    // Logic for creating a user
    // ...
    const newUser = {
      username,
      password,
      email,
      roleID,
      projects: [{ projectId: parseInt(selectedProject) }],
    };

    axios
      .post("https://localhost:44307/auth/Register", newUser, {
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          console.log(response.data.isSuccess);
          setOpenSnackbar(true);
          setSnackbarMessage("User created successfully");
          // Clear input fields after successful user creation
          setUsername("");
          setPassword("");
          setEmail("");
        } else {
          setOpenSnackbar(true);
          setSnackbarMessage("Failed to create user");
        }
      })
      .catch((error) => {
        setOpenSnackbar(true);
        setSnackbarMessage("Error creating user");
        console.error("Error creating user:", error);
      });
  };

  const handleRoleChange = (event) => {
    setRoleID(event.target.value);
  };
  const handleLogout = () => {
    // Implement your logout logic here
    // For example:
    localStorage.removeItem("userID");
    // Redirect to logout or login page
    window.location.href = "/login";
  };
  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Left top corner toggle icon */}
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size="small"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 9999,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Sidebaradmin isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <Box
        sx={{
          width: "80%",
          maxWidth: 500,
          margin: "auto",
          padding: 4,
          backgroundColor: "#fff",
          // Light background color
          border: "1px solid #ddd", // Light border color
          borderRadius: 12, // Border radius
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Op
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create User
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                style: { backgroundColor: "#fff" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                style: { backgroundColor: "#fff" },
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              InputProps={{
                style: { backgroundColor: "#fff" },
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select value={roleID} onChange={handleRoleChange}>
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Project</InputLabel>
              <Select
                value={selectedProject}
                onChange={handleProjectChange}
                sx={{
                  "& select": {
                    backgroundColor: "#fff", // White background color for the dropdown
                  },
                }}
              >
                {projects.map((project) => (
                  <MenuItem
                    key={project.projectID}
                    value={project.projectID.toString()}
                  >
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handleCreateUser}
              size="small"
              fullWidth
            >
              Create User
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Addusers;
