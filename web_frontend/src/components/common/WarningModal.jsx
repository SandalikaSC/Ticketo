import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";

const WarningModal = ({ open, onClose, content }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="warning-modal-title"
      aria-describedby="warning-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <ErrorIcon style={{ color: "red", fontSize: 48 }} />
        <h2 id="warning-modal-title">Error!</h2>
        <p id="warning-modal-description">{content}</p>
        <Button
          variant="contained"
          onClick={onClose}
          style={{ backgroundColor: "#3D51A9", color: "white" }}
        >
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
