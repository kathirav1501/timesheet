import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Assuming 'CheckCircle' is your desired green rounded icon

const AccountProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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
          const userData = data.data[0]; // Assuming the user data is the first item in the array

          setUser({
            name: userData.userName,
            email: userData.email,
            active: userData.active,
            role: userData.role,
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        borderRadius: "10px",
        flexDirection: "row",
        width: "400px", // Width of the ID card
        overflow: "hidden", // Hide overflow content
      }}
    >
      {user ? (
        <>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Avatar
              src="/assets/avatars/avatar-placeholder.png"
              sx={{
                height: 80,
                width: 80,
                mb: 2,
              }}
            />
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            {user.active && (
              <Box
                sx={{
                  color: "green",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon />
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ marginLeft: "5px" }}
                >
                  Active
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary">
              Role: {user.role.roleName}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              borderLeft: "1px solid #ccc", // Add border between sections
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {/* Additional user details */}
              Projects
            </Typography>
          </Box>
        </>
      ) : (
        <CardContent>
          <Typography variant="body1">Loading...</Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default AccountProfile;
