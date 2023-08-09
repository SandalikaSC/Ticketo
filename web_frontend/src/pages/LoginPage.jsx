import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      });

      setLoginError("");

      const data = res.data;
      console.log(data);
      return data;
    } catch (error) {
      setLoginError("Invalid credentials");
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      setLoginError("Please fill in all fields.");
      return;
    }

    if (!isEmailValid(inputs.email)) {
      setLoginError("Invalid email format.");
      return;
    }

    if (!isPasswordValid(inputs.password)) {
      setLoginError("Password must be at least 8 characters.");
      return;
    }

    try {
      const data = await sendRequest();
      if (data === null) {
        console.log("There is an error in the API request");
        return;
      }
      const { accessToken, userType } = data;

      localStorage.setItem("accessToken", accessToken);
      dispatch(authActions.login());

      if (userType[0] === "ADMIN") {
        history("/admin");
      } else if (userType[0] === "CONTROL_CENTRE") {
        history("/cc");
      } else if (userType[0] === "STATION_MASTER") {
        history("/ss");
      } else if (userType[0] === "TICKET_CLERK") {
        history("/tc");
      } else {
        console.log("Unknown userType:", userType);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={5}>
        <Box>
          <img src="images/logo.png" alt="logo" />
          <Typography variant="h5" align="center">
            Where your train adventure begins
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography variant="h3" align="center">
              Login
            </Typography>
            <TextField
              placeholder="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src="images/usericon.png" alt="User Icon" />
                  </InputAdornment>
                ),
                autoComplete: "off",
              }}
            />
            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              placeholder="Password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src="images/passwordicon.png" alt="User Icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordToggle} edge="end">
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                autoComplete: "off",
              }}
            />
            <Button type="submit" variant="h1" color="primary" fullWidth>
              Login
            </Button>
            {loginError && <Box sx={{ color: "red" }}>{loginError}</Box>}
            <Box>
              <Typography>Forgot Password?</Typography>
              <Link href="#" color="textSecondary">
                Recover Here
              </Link>
            </Box>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
