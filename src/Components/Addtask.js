import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import Sidebaruser from "./Sidebaruser";
import Sidebaradmin from "./Sidebaradmin";

const formatDate = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setHours(12, 0, 0, 0); // Set time to 12:00
  return formattedDate.toISOString().slice(0, -1);
};

const Addtask = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    jiraID: "",
    jiraLink: "",
    projectID: "",
    date: formatDate(new Date()), // Set default time to 12:00
    hoursSpent: 0,
    userID: 0,
    projectOptions: [],
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const userIDFromStorage = localStorage.getItem("userID");
    if (userIDFromStorage) {
      setFormData((prevData) => ({
        ...prevData,
        userID: parseInt(userIDFromStorage, 10),
      }));
    }
    const fetchProjectOptions = async () => {
      try {
        const response = await axios.post(
          "https://localhost:44307/GetAllProjects",
          "",
          {
            headers: {
              accept: "application/json",
            },
          }
        );

        const projects = response.data.data;
        setFormData((prevData) => ({
          ...prevData,
          projectOptions: projects,
        }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjectOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedFormData = {
        ...formData,
        date: formatDate(formData.date), // Format date for backend
      };

      await axios.post("https://localhost:44307/addTask", formattedFormData, {
        headers: {
          "Content-Type": "application/json",
          accept: "text/plain",
        },
      });

      toast.success("Task saved successfully");
      setFormData({
        taskName: "",
        jiraID: "",
        jiraLink: "",
        projectID: "",
        date: formatDate(new Date()), // Reset date to default 12:00
        hoursSpent: 0,
        userID: formData.userID,
        projectOptions: formData.projectOptions,
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error saving task");
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("userID");
    window.location.href = "/login";
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
          paddingRight: 2,
        }}
      >
        {/* Header */}
        <IconButton
          onClick={toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <IconButton onClick={handleLogout} color="inherit">
          <LogoutIcon />
        </IconButton>
      </Box>
      <Container
        maxWidth="sm"
        sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Add Task
          </Typography>
        </Box>
        <Sidebaradmin isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectID"
                select
                value={formData.projectID}
                onChange={handleChange}
              >
                {formData.projectOptions.map((project) => (
                  <MenuItem key={project.projectID} value={project.projectID}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Task Details"
                name="taskName"
                value={formData.taskName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Jira ID"
                name="jiraID"
                value={formData.jiraID}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Jira Link"
                name="jiraLink"
                value={formData.jiraLink}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Hours Spent"
                name="hoursSpent"
                type="number"
                value={formData.hoursSpent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Addtask;
