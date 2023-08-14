import React, { useState, useEffect } from "react";
import logoImage from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";

//import { Visibility, VisibilityOff } from "@material-ui/icons";

const PasswordReset = () => {
  //const history = useHistory();
  const history = useNavigate();
  const [showEmailSection, setShowEmailSection] = useState(true);
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "", // Initialize other formData fields here
  });
  // const [showPasswordReset, setShowPasswordReset] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    let timer;
    if (showOTPSection) {
      // Display the countdown timer after 1 second
      timer = setTimeout(() => {
        startCountdown();
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showOTPSection]);

  const startCountdown = () => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000); // Update every second
  };

  const handleSendOTP = async (formData) => {
    setLoading(true);
    try {
      console.log(formData.email);
      const response = await axios.post(
        "http://localhost:5000/api/generate-otp",
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setShowEmailSection(false);
        setShowOTPSection(true);
      } else {
        // Handle error here
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    const otpValue = parseInt(otpDigits.join(""), 10);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        {
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          otp: otpValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("hiii");
      if (response.status === 200) {
        setShowOTPSection(false);
        setShowPasswordReset(true);
      } else {
        console.error("OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword === confirmPassword) {
      // Passwords match, proceed with reset
      const dataToSend = {
        email: formData.email, // Replace with the actual email
        mobileNumber: "", // Replace with the actual mobile number
        password: newPassword,
        confirmPassword: confirmPassword,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/reset-password",
          dataToSend
        );

        if (response.status === 200) {
          // Password reset successful, redirect to login page
          //history.push("/login"); // Use the history object to navigate to the login page
          console.log("reset successfully");
          history("/");
        } else {
          console.log("Password reset failed");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Passwords don't match
      setPasswordsMatch(false);
    }
  };
  if (showOTPSection) {
    startCountdown();
    // Rest of your JSX code...
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "3%",
          paddingTop: "1%",
          borderRadius: "20px",
        }}
      >
        {showEmailSection && (
          <div>
            <img
              src={logoImage}
              alt="Logo"
              style={{
                width: "50%",
                display: "block",
                margin: "0 auto",
              }}
            />
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                fontSize: "1.3em",
                color: "grey",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Where your train adventure begins
            </Typography>
            <Divider />
            <div
              style={{
                marginTop: "20px",
                color: "#3a4da3",
                fontWeight: "600",
              }}
            >
              <Typography
                variant="body1"
                style={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Enter your email address:
              </Typography>
              <TextField
                type="email"
                placeholder="Email address"
                value={formData.email} // Use formData.email here
                onChange={
                  (event) =>
                    setFormData({ ...formData, email: event.target.value }) // Update email in formData
                }
                fullWidth
                style={{ marginBottom: "10px", borderRadius: "25px" }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  backgroundColor: "#FA6F5D",
                  borderRadius: "25px",
                  fontSize: "1em",
                  width: "50%",
                  display: "block",
                  margin: "0 auto",
                }}
                onClick={() => handleSendOTP(formData)}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Send OTP"}
              </Button>
            </div>
          </div>
        )}

        {/* {showOTPSection && (
          <div>
            <img
              src={logoImage}
              alt="Logo"
              style={{
                width: "20%",
                display: "block",
                margin: "0 auto",
              }}
            />
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                fontSize: "1.3em",
                color: "grey",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Where your train adventure begins
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              style={{
                fontWeight: "600",
                marginBottom: "10px",
                textAlign: "center",
                marginTop: "20px",
                color: "#3a4da3",
              }}
            >
              Enter your received OTP below.
            </Typography>
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                maxLength={1}
                value={digit}
                onChange={(event) => {
                  const newDigits = [...otpDigits];
                  newDigits[index] = event.target.value;
                  setOtpDigits(newDigits);
                }}
                style={{
                  width: "60px",
                  textAlign: "center",
                  fontSize: "1.5em",
                  marginRight: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <span style={{ fontSize: "1.5em" }}> </span>
              <input
                type="text"
                maxLength={1}
                value={otp}
                onChange={(event) => setOTP(event.target.value)}
                style={{
                  width: "60px",
                  textAlign: "center",
                  fontSize: "1.5em",
                  marginRight: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <span style={{ fontSize: "1.5em" }}> </span>
              <input
                type="text"
                maxLength={1}
                value={otp}
                onChange={(event) => setOTP(event.target.value)}
                style={{
                  width: "60px",
                  textAlign: "center",
                  fontSize: "1.5em",
                  marginRight: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <span style={{ fontSize: "1.5em" }}> </span>
              <input
                type="text"
                maxLength={1}
                value={otp}
                onChange={(event) => setOTP(event.target.value)}
                style={{
                  width: "60px",
                  textAlign: "center",
                  fontSize: "1.5em",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                backgroundColor: "#FA6F5D",
                borderRadius: "25px",
                fontSize: "1em",
                width: "50%",
                display: "block",
                margin: "0 auto",
              }}
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </Button>
            {countdown > 0 && (
              <Typography
                variant="body1"
                style={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Time Left: {Math.floor(countdown / 60)}:
                {(countdown % 60).toString().padStart(2, "0")}
              </Typography>
            )}
          </div>
        )} */}

        {showOTPSection && (
          <div>
            <img
              src={logoImage}
              alt="Logo"
              style={{ width: "20%", margin: "0 auto" }}
            />
            <Typography variant="subtitle1">
              Where your train adventure begins
            </Typography>
            <Divider />
            <Typography variant="body1">
              Enter your received OTP below.
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => {
                    const newDigits = [...otpDigits];
                    newDigits[index] = event.target.value;
                    setOtpDigits(newDigits);
                  }}
                  style={{
                    width: "60px",
                    textAlign: "center",
                    fontSize: "1.5em",
                    marginRight: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                backgroundColor: "#FA6F5D",
                borderRadius: "25px",
                fontSize: "1em",
                margin: "20px auto",
              }}
              onClick={handleVerifyOTP}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
            {/* {countdown > 0 && (
              <Typography
                variant="body1"
                style={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Time Left: {Math.floor(countdown / 60)}:
                {(countdown % 60).toString().padStart(2, "0")}
              </Typography>
            )} */}
          </div>
        )}

        {showPasswordReset && (
          <div>
            <img
              src={logoImage}
              alt="Logo"
              style={{
                width: "20%",
                display: "block",
                margin: "0 auto",
              }}
            />
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                fontSize: "1.3em",
                color: "grey",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Where your train adventure begins
            </Typography>
            <Divider />

            <div style={{ marginTop: "20px" }}>
              <Typography
                variant="body1"
                style={{ fontWeight: "600", marginBottom: "5px" }}
              >
                Enter new password:
              </Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                fullWidth
                style={{ marginBottom: "10px", borderRadius: "25px" }}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                fullWidth
                style={{ marginBottom: "10px", borderRadius: "25px" }}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {!passwordsMatch && (
                <Typography variant="caption" color="error">
                  Passwords do not match.
                </Typography>
              )}
              <div>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                </IconButton>
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {/* {showConfirmPassword ? <Visibility /> : <VisibilityOff />} */}
                </IconButton>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  backgroundColor: "#FA6F5D",
                  borderRadius: "25px",
                  fontSize: "1em",
                  width: "50%",
                  display: "block",
                  margin: "0 auto",
                }}
                onClick={handlePasswordReset}
              >
                Reset Password
              </Button>
            </div>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default PasswordReset;
