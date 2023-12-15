import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const ViewTasks = () => {
  const [userTasks, setUserTasks] = useState([]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust date format as needed
  };

  return (
    <>
      <Card
        variant="elevation"
        elevation={5}
        sx={{ maxWidth: "100%", margin: "auto", marginTop: 2 }}
      >
        <CardContent>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow
                  style={{ backgroundColor: "darkgrey", color: "white" }}
                >
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
        </CardContent>
      </Card>
    </>
  );
};

export default ViewTasks;
