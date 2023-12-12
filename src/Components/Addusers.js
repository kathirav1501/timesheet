import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Button,
  Grid,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import axios from "axios";

import Sidebaradmin from "./Sidebaradmin";
import CustomAppBar from "./CustomAppBar";
import CombinedDrawer from "./CombinedDrawer";

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

  return (
    <div>
      <CombinedDrawer Tittle="Add Users" currentComponent={Addusers} />

      <Box
        sx={{
          width: "80%",
          maxWidth: 500,
          margin: "auto",
          padding: 4,
          backgroundColor: "#fff",
          // Light background color
          border: "1px solid #ddd", // Light border color
          borderRadius: 5, // Border radius
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Op
          marginTop: "30px",
        }}
      >
        <Typography variant="h6" align="left" gutterBottom>
          Enter User Details
        </Typography>
        <Grid container spacing={3.5}>
          <Grid item xs={10} sm={6}>
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
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select value={roleID} onChange={handleRoleChange}>
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>User</MenuItem>
              </Select>
            </FormControl>
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
          <Grid item xs={4}>
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
    </div>
  );
};

export default Addusers;
