import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const formatDate = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setHours(12, 0, 0, 0); // Set time to 12:00
  return formattedDate.toISOString().slice(0, -1);
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const User = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    jiraID: "",
    jiraLink: "",
    projectID: "",
    TaskStartTime: formatDate(new Date()), // Set default time to 12:00
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
        TaskStartTime: formatDate(new Date()), // Reset date to default 12:00
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
      {/* <CustomAppBar
        toggleDrawer={toggleDrawer}
        handleLogout={handleLogout}
        title="Add Tasks" // Pass the title as a prop
      /> */}

      <Container
        maxWidth="sm"
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Enter Your Task
          </Typography>
        </Box>

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
                label="Board ID"
                name="jiraID"
                value={formData.jiraID}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Board Link"
                name="jiraLink"
                value={formData.jiraLink}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Hours Spent"
                name="hoursSpent"
                type="number"
                value={formData.hoursSpent}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                size="small"
                style={{ fontSize: "0.7rem" }}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
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

export default User;
