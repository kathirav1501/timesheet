import { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

export const AccountProfileDetails = () => {
  const [userDetails, setUserDetails] = useState({
    userID: 0,
    userName: "",
    email: "",
    active: true,
    projects: [{ projectID: 0, projectName: "" }],
    role: { roleID: 0, roleName: "" },
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
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

          setUserDetails(userDetailsFromApi);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Card variant="elevation" elevation={10}>
      <CardHeader subheader="PERSONAL DETAILS" />
      <CardContent sx={{ pt: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">User ID:</Typography>
            <Typography variant="body1">{userDetails.userID}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">User Name:</Typography>
            <Typography variant="body1">{userDetails.userName}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Email:</Typography>
            <Typography variant="body1">{userDetails.email}</Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Role</Typography>
            <Typography variant="body1">{userDetails.role.roleName}</Typography>
          </Grid>
          {/* Include other details similarly */}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}></CardActions>
    </Card>
  );
};
