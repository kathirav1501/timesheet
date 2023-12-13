import React, { useState } from "react";
import axios from "axios";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const containerStyle = {
    //  backgroundImage: `url('backdrop.jpg')`, // Replace 'path_to_your_image.jpg' with the actual path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  };

  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://localhost:44307/auth/Login", {
        username: username,
        password: password,
      });

      const data = response.data;

      if (response.status === 200) {
        console.log(data);
        localStorage.setItem("userID", data.data.userID);
        localStorage.setItem("role", data.data.role);
        const { role } = data.data;

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/Addtask");
        }
      } else {
        console.error("Login failed");
        setError("Login failed. Please try again.");
        setOpenError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Network error occurred. Please try again.");
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={containerStyle}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <img
              src="/SmartPoint_AV_Logo.png"
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
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert onClose={handleCloseError} severity="error">
              {error}
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Login;
