import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import Sidebaruser from "./Sidebaruser";

const ViewTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userID, setUserID] = useState(0); // State to store the user ID
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  useEffect(() => {
    // Fetch user ID from localStorage
    const userIDFromStorage = localStorage.getItem("userID");
    if (userIDFromStorage) {
      setUserID(parseInt(userIDFromStorage, 10));
    }

    // Fetch tasks based on user ID
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44307/GetSingleUsersTasks?UserID=${userID}`,
          {
            headers: {
              accept: "*/*",
            },
          }
        );

        setUserTasks(response.data.data[0].tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Handle error, show message, etc.
      }
    };

    if (userID !== 0) {
      fetchTasks();
    }
  }, [userID]);

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
    // Implement your logout logic here
    // For example:
    localStorage.removeItem("userID");
    // Redirect to logout or login page
    window.location.href = "/login";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust date format as needed
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" align="center" gutterBottom>
          View Tasks
        </Typography>
        <IconButton onClick={handleLogout} color="inherit">
          <LogoutIcon />
        </IconButton>
      </Box>
      <Sidebaruser isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow style={{ backgroundColor: "darkgrey", color: "white" }}>
              <TableCell>Resource Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task.taskID}>
                  <TableCell>{task.userName}</TableCell>
                  <TableCell>{formatDate(task.date)}</TableCell>
                  <TableCell>{task.project.projectName}</TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.hoursSpent}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </>
  );
};

export default ViewTasks;
