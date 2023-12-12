import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userID) {
      fetchData();
    }
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Avatar />
          </Box>
          {userData && (
            <>
              <Typography
                variant="h5"
                component="div"
                align="center"
                gutterBottom
              >
                {userData.userName}
              </Typography>
              <Divider />
              <Box sx={{ mt: 2 }}>
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
