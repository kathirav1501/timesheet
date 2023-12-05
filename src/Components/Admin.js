import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button,
  TablePagination,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Sidebaradmin from "./Sidebaradmin";

// ... StyledTableCell, StyledTableRow, TableContainerStyled, FilterContainer styles remain unchanged ...

function Admin() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [resourceFilter, setResourceFilter] = useState(""); // New state for resource filter
  const [currentPage, setCurrentPage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44307/GetAllUsersTasks",
          {
            headers: {
              accept: "*/*",
            },
          }
        );
        if (response.data && response.data.data) {
          setTableData(response.data.data);
          setFilteredData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getResourceNames = () => {
    const names = tableData.map((item) => item.userName);
    return Array.from(new Set(names));
  };

  const handleFilterChange = (event) => {
    const keyword = event.target.value.toLowerCase();
    setFilter(keyword);
    const filtered = tableData.filter((item) =>
      item.userName.toLowerCase().includes(keyword)
    );
    const filteredByResource = filtered.filter((item) =>
      item.userName.toLowerCase().includes(resourceFilter.toLowerCase())
    );
    setFilteredData(filteredByResource);
    setCurrentPage(0);
  };

  const handleResourceFilterChange = (event) => {
    const selectedResource = event.target.value;
    setResourceFilter(selectedResource);
    const filtered = tableData.filter((item) =>
      item.userName.toLowerCase().includes(filter.toLowerCase())
    );
    const filteredByResource = filtered.filter((item) =>
      item.userName.toLowerCase().includes(selectedResource.toLowerCase())
    );
    setFilteredData(filteredByResource);
    setCurrentPage(0);
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
    // Redirect to logout or login page

    window.location.href = "/login";
  };

  const exportToExcel = () => {
    const dataForExport = filteredData
      .map((user) =>
        user.tasks.map((task) => ({
          "Resource Name": user.userName,
          Date: new Date(task.date).toLocaleDateString(),
          Project: task.project.projectName,
          Task: task.taskName,
          Hours: task.hoursSpent,
        }))
      )
      .flat();

    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div>
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
        <Typography variant="h4" align="center" gutterBottom>
          Resource Tasks
        </Typography>
        <IconButton onClick={handleLogout} color="inherit">
          <LogoutIcon />
        </IconButton>
      </Box>

      {/* Sidebar */}
      <Sidebaradmin isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Filter and Export Button */}
        <TextField
          select
          label="Filter by Resource Name"
          value={resourceFilter}
          onChange={handleResourceFilterChange}
          variant="outlined"
          style={{ marginBottom: "2rem", width: "20%" }}
          size="small"
        >
          {getResourceNames().map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={exportToExcel}>
          <FileDownloadIcon /> Export to Excel
        </Button>

        {/* Table */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "80%",
            margin: "auto",
            marginTop: 2,
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "90%", margin: "auto" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  style={{ backgroundColor: "darkgrey", color: "white" }}
                >
                  <TableCell
                    sx={{ width: "15%", fontSize: "0.8rem", padding: "8px" }}
                  >
                    Resource Name
                  </TableCell>
                  <TableCell
                    sx={{ width: "10%", fontSize: "0.8rem", padding: "8px" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ width: "15%", fontSize: "0.8rem", padding: "8px" }}
                  >
                    Project
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", padding: "8px" }}>
                    Task
                  </TableCell>
                  <TableCell
                    sx={{ width: "10%", fontSize: "0.8rem", padding: "8px" }}
                  >
                    Hours
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Table Rows */}
                {currentRows.map((user, index) =>
                  user.tasks.map((task, taskIndex) => (
                    <TableRow key={`${index}-${taskIndex}`}>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>
                        {new Date(task.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{task.project.projectName}</TableCell>
                      <TableCell>{task.taskName}</TableCell>
                      <TableCell>{task.hoursSpent}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={(e, newPage) => setCurrentPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(0);
            }}
            style={{ margin: "auto", marginTop: 2 }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Admin;
