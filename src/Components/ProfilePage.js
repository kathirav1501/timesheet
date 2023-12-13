import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material"; // Import the icon for online status
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState(false); // State for online status

  useEffect(() => {
    // Retrieve userID from localStorage or any other source
    const userID = localStorage.getItem("userID");

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://localhost:44307/GetSingleUser?UserID=${userID}`,
          {}
        );

        const userData = response.data.data[0];
        setUserData(userData);

        // Assuming online status is retrieved along with user data
        setOnlineStatus(userData.active); // Set online status based on 'active' property
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Fill the entire screen height
        background: "#f0f0f0", // Placeholder background color
        padding: "0 20px", // Add padding to the main container
      }}
    >
      <Card sx={{ width: "80%", maxWidth: 800, padding: "20px" }}>
        {" "}
        {/* Adjusted width of the card */}
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 3,
              position: "relative",
            }}
          >
            <Avatar sx={{ width: 120, height: 120 }}>
              {" "}
              <AccountCircleIcon sx={{ width: 120, height: 120 }} />
              {/* Larger avatar */}
              {/* Add your avatar content here */}
            </Avatar>
            {/* Display the online status indicator */}
            {/* {onlineStatus && (
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "#00FF00",
                  borderRadius: "50%",
                }}
              >
                <CheckCircleOutline sx={{ color: "#ffffff", fontSize: 40 }} />{" "}
                Larger icon
              </IconButton>
            )} */}
          </Box>
          {userData && (
            <>
              <Typography
                variant="h4"
                component="div"
                align="center"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {userData.userName}
              </Typography>
              <Divider />
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1">
                  <strong>Email:</strong> {userData.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Role:</strong> {userData.role.roleName}
                </Typography>
                <Typography variant="body1">
                  <strong>Active:</strong> {userData.active ? "Yes" : "No"}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
