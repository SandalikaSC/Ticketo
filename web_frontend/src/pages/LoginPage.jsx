import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
      const { accessToken, userType, loginStatus } = data;

      localStorage.setItem("accessToken", accessToken);
      dispatch(authActions.login());

      if (userType[0] === "ADMIN") {
        history("/admin");
      } else if (userType[0] === "CONTROL_CENTRE") {
        history("/cc");
      } else if (userType[0] === "STATION_MASTER") {
        // history("/ss");
        if (loginStatus === false) {
          history("/reset-password");
        } else {
          history("/ss");
        }
      } else if (userType[0] === "TICKET_CLERK") {
        // history("/tc");
        if (loginStatus === false) {
          history("/reset-password");
        } else {
          history("/tc");
        }
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
    <main style={{ width: "100%", marginTop: "3%" }}>
      <Grid container spacing={0} style={{ marginLeft: "0" }}>
        <Divider
          orientation="vertical"
          flexItem
          style={{
            backgroundColor: "#3a4da3",
            width: "3%",
            marginTop: "-10%",
            marginBottom: "-8%",
          }}
        />
        <Grid item xs={5}>
          <Box>
            <img
              src="images/logo.png"
              alt="logo"
              style={{
                marginLeft: "12%",
                animation: "rotation 30s infinite linear ",
                transformOrigin: "center",
                overflow: "visible",
              }}
            />
            <Typography
              variant="h4"
              align="center"
              style={{ color: "grey", fontStyle: "italic" }}
            >
              Where your train adventure begins
            </Typography>
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          style={{
            backgroundColor: "#ECECEC",
            width: "1%",
            border: "none",
            borderRadius: "84%",
          }}
        />
        <Grid item xs={5} style={{ marginLeft: "5%" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              marginTop: " 12%",
            }}
          >
            <Box style={{ textAlign: "center" }}>
              <Typography
                style={{
                  fontSize: "3em",
                  color: "#3D51A9",
                  marginBottom: "40px",
                  fontWeight: "bold",
                }}
              >
                Login
              </Typography>
              <input
                placeholder="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                style={{
                  width: "75%",
                  padding: "3%",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: "#ECECEC",
                  outline: "none",
                  boxSizing: "border-box",
                  marginBottom: "7%",
                }}
              />
              <input
                name="password"
                onChange={handleChange}
                value={inputs.password}
                placeholder="Password"
                style={{
                  width: "75%",
                  padding: "3%",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: "#ECECEC",
                  outline: "none",
                  boxSizing: "border-box",
                  marginBottom: "10%",
                }}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordToggle} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <button
                type="submit"
                style={{
                  width: "40%",
                  padding: "18px",
                  borderRadius: "50px",
                  backgroundColor: "#3D51A9",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              {loginError && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {loginError}
                </div>
              )}
              <div
                style={{
                  marginTop: "4%",
                  textAlign: "center",
                  marginBottom: "6%",
                  fontSize: "1.2em",
                }}
              >
                <span
                  style={{
                    color: "#3D51A9",
                    fontWeight: "bold",
                    marginTop: "3%",
                  }}
                >
                  Forgot Password?
                </span>
                <Link
                  to="/reset-password" // Specify the path to the reset password page
                  style={{
                    color: "#FA6F5D",
                    marginLeft: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Recover Here
                </Link>
              </div>
            </Box>
          </form>
        </Grid>
      </Grid>
    </main>
  );
};

export default LoginPage;
