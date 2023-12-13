import { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const fetchUserData = async (userID) => {
  try {
    const response = await axios.get(
      `https://localhost:44307/GetSingleUser?UserID=${userID}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user data");
  }
};

export const AccountProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userIDFromLocalStorage = localStorage.getItem("userID");
    if (userIDFromLocalStorage) {
      fetchUserData(userIDFromLocalStorage)
        .then((data) => {
          setUserData(data?.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <Card>
      <CardContent>
        {userData && (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={userData.avatar || "/default-avatar.png"}
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
              {userData.email}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {userData.role}
            </Typography>
            {/* Other user details */}
          </Box>
        )}
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
