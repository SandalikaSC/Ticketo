import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ type, message }) => {
  useEffect(() => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else if (type === "error") {
      toast.error(message);
    }
  }, [type, message]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(["success", "warning", "error"]).isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
