import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const Profile = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    active: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://localhost:44307/GetSingleUser?UserID=20",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const userDetailsFromApi = data?.data[0];

          setUserData({
            userName: userDetailsFromApi.userName,
            email: userDetailsFromApi.email,
            active: userDetailsFromApi.active,
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src="/user.png" // Update with actual avatar URL if available
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {userData.userName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Email: {userData.email}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Active: {userData.active ? "Yes" : "No"}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions></CardActions>
    </Card>
  );
};
