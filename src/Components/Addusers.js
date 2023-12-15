import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import axios from "axios";

const Addusers = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [roleID, setRoleID] = useState(0);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

          // Clear input fields after successful user creation
          setUsername("");
          setPassword("");
          setEmail("");
        } else {
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        setOpenSnackbar(true);

        console.error("Error creating user:", error);
      });
  };

  const handleRoleChange = (event) => {
    setRoleID(event.target.value);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div>
      {/* <CombinedDrawer Tittle="Add Users" currentComponent={Addusers} /> */}

      <Card
        variant="elevation"
        elevation={5}
        sx={{ maxWidth: "70%", margin: "auto", marginTop: 3 }}
      >
        <CardContent>
          <Typography variant="h6" align="left" gutterBottom>
            Enter User Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl label="Board Link" fullWidth size="small">
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
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Project</InputLabel>
                <Select value={selectedProject} onChange={handleProjectChange}>
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
            <Grid item xs={2}>
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
            {/* Snackbar content */}
          </Snackbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default Addusers;
