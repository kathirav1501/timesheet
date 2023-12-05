import React, { useState } from "react";
import axios from "axios";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const containerStyle = {
    backgroundImage: "linear-gradient(to bottom, #4e54c8, #8f94fb)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:44307/auth/Login", {
        username: username,
        password: password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Successful login
        console.log(data);
        localStorage.setItem("userID", data.data.userID);
        const { role, accessToken } = data.data;

        if (role === "admin") {
          navigate("/admin"); // Change "/admin" to your admin page route
        } else {
          navigate("/user"); // Change "/user" to your user page route
        }
        // You can store the accessToken in localStorage or state for further API requests
      } else {
        // Handle unsuccessful login
        console.error("Login failed");
        // Display error message or take appropriate action
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors or other exceptions
    }
  };

  return (
    <Box style={containerStyle}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <img
              src="/logo-new.png"
              alt="Avatar"
              style={{ width: "60%", height: "80%" }}
            />

            <h2>Sign In</h2>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            style={{ height: "15%" }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            style={{ height: "18%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Login;
