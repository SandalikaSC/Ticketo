import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import { Paper, TextField, Button, Typography, Divider } from "@mui/material";

const PasswordReset = () => {
  const [showEmailSection, setShowEmailSection] = useState(true);
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleSendOTP = () => {
    setShowEmailSection(false);
    setShowOTPSection(true);
  };

  const handleVerifyOTP = () => {
    setShowOTPSection(false);
    setShowPasswordReset(true);
  };

  const handlePasswordReset = () => {
    // Add logic here to reset the password
  };

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
                onClick={handleSendOTP}
              >
                Send OTP
              </Button>
            </div>
          </div>
        )}

        {showOTPSection && (
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
                maxLength={4}
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
                maxLength={4}
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
                maxLength={4}
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
                maxLength={4}
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
                type="password"
                placeholder="New Password"
                fullWidth
                style={{ marginBottom: "10px", borderRadius: "25px" }}
              />
              <TextField
                type="password"
                placeholder="Confirm New Password"
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
