import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TrainConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  trainDetails,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ color: "#FA6F5D", textAlign: "center" }}>
        <h3>Confirm Train Addition</h3>
      </DialogTitle>
      <DialogContent>
        <div
          style={{
            backgroundColor: "#ECECEC",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h7" style={{ fontWeight: "bold" }}>
            Galu Kumari - 8975
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginTop: "20px" }}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", color: "#3D51A9", fontSize: "1rem" }}
            >
              First Class
            </Typography>
            <List>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="No of Coaches: 5" />
              </ListItem>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="Reserved Coaches: 3" />
              </ListItem>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="Non Reserved Coaches: 2" />
              </ListItem>
            </List>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", color: "#3D51A9", fontSize: "1rem" }}
            >
              Second Class
            </Typography>
            <List>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="No of Coaches: 8" />
              </ListItem>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="Reserved Coaches: 5" />
              </ListItem>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="Non Reserved Coaches: 3" />
              </ListItem>
            </List>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", color: "#3D51A9", fontSize: "1rem" }}
            >
              Third Class
            </Typography>
            <List>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="No of Coaches: 6" />
              </ListItem>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="Reserved Coaches: 4" />
              </ListItem>
              <ListItem disableGutters style={{ marginBottom: "-15px" }}>
                <ListItemText primary="Non Reserved Coaches: 2" />
              </ListItem>
            </List>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TrainConfirmationDialog;
