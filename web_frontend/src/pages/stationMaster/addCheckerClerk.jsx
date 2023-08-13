import React, { useState } from "react";
import axios from "axios";
import "../../css/stationmaster.css";
import { Modal, Box, Typography, Button } from "@mui/material";
import EmpCard from "../../components/stationMaster/EmpCard"; // Update the path to EmpCard component if necessary
import "../../css/sm_dashboard.css";
import userImage from "../../assets/user2.png"; // Update the path as needed
import empImage from "../../assets/user3.png";
import empoImage from "../../assets/user6.png";
import usersImage from "../../assets/user7.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const employees = [
  {
    role: "Ticket Clerk",
    emp_image: userImage, // Use the imported image
    name: "Shenil Perera",
    nic: "947006431V",
    email: "shenil@gmail.com",
    phone: "077-6784325",
  },
  {
    role: "Ticket Checker",
    emp_image: empImage, // Use the imported image
    name: "Kevin De Silva",
    nic: "887654321V",
    email: "kevin12@gmail.com",
    phone: "075-1234567",
  },
  {
    role: "Ticket Clerk",
    emp_image: usersImage, // Use the imported image
    name: "Sunil Perera",
    nic: "897006431V",
    email: "sunil@gmail.com",
    phone: "077-6784325",
  },
  {
    role: "Ticket Checker",
    emp_image: empoImage, // Use the imported image
    name: "Anil De Silva",
    nic: "907654321V",
    email: "anil012@gmail.com",
    phone: "074-1234567",
  },
];

const AddCheckerClerk = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobPosition: "clerk",
    nic: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile Number must be a 10-digit number";
    }
    if (!formData.nic) {
      newErrors.nic = "NIC Number is required";
    } else if (!/^\d{9}[vV\d]{1}$|^\d{12}$/.test(formData.nic)) {
      newErrors.nic = "NIC Number is invalid";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(
        "http://localhost:5000/api/add-user",
        formData,
        { headers }
      );
      console.log("Data sent to backend:", response.data);

      if (response.status === 201) {
        setIsSuccessDialogOpen(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          jobPosition: "clerk",
          nic: "",
          mobileNumber: "",
        });
      } else {
        setIsErrorDialogOpen(true);
      }

      // Optionally show a success message or perform other actions
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setIsErrorDialogOpen(true);
      // Optionally show an error message or perform error handling
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const closeSuccessDialog = () => {
    setIsSuccessDialogOpen(false);
  };

  const closeErrorDialog = () => {
    setIsErrorDialogOpen(false);
  };

  return (
    <div className="main_container">
      <div className="left_container">
 
     <h1 className="title-sm-emp">Station Employees</h1>
        <div className="form_container">
    <h3 className="title-sm-emp title-sm-emp2">Add Employee</h3>
          <form className="addcheckerclerk_form" onSubmit={handleSubmit}>
    
            <label className="sm-label">
              Email:
              <br />
              <input
                type="email"
                className="box"
                placeholder="Please enter a valid email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="sm-error-message">{errors.email}</p>
              )}
            </label>

            <label className="sm-label">
 
              First Name:
              <br />
              <input
                type="text"
                className="box"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="sm-error-message">{errors.firstName}</p>
              )}
            </label>

            <label className="sm-label">
              Last Name:
              <br />
              <input
                type="text"
                className="box"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="sm-error-message">{errors.lastName}</p>
              )}
            </label>
 

            <label className="sm-label">
  
              Job Position:
              <br />
              <select
                className="box"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
              >
                <option value="clerk">Ticket Clerk</option>
                <option value="checker">Ticket Checker</option>
              </select>
              {errors.jobPosition && (
                <p className="sm-error-message">{errors.jobPosition}</p>
              )}
            </label>

            <label className="sm-label">
              NIC:
              <br />
              <input
                type="text"
                className="box"
                minLength={10}
                name="nic"
                value={formData.nic}
                onChange={handleChange}
              />
              {errors.nic && <p className="sm-error-message">{errors.nic}</p>}
            </label>

            <label className="sm-label">
              Mobile No.:
              <br />
              <input
                type="text"
                className="box"
                placeholder="Please enter a valid mobile number with 10 digits"
                minLength={10}
                pattern="[0-9]+"
                title="Please enter a valid mobile number with 10 digits"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && (
                <p className="sm-error-message">{errors.mobileNumber}</p>
              )}
            </label>

            <button className="addbutton" type="submit">
              <b>Add</b>
            </button>
          </form>
        </div>
      </div>

      <div className="right_container_scrollable-content">
        <div className="employee-details-container">
          <h2 className="sub-section-heading"> Galle Railway Station</h2>

          <div className="employee-card-container">
            {employees.map((employee, index) => (
              <EmpCard key={index} employee={employee} />
            ))}
          </div>
        </div>
      </div>

      <Modal open={isSuccessDialogOpen} onClose={closeSuccessDialog}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Adjust this as needed
            top: "50%",
            left: "50%",
            textAlign: "center",
            borderRadius: "30%",
          }}
        >
          <Box sx={{ width: 300, bgcolor: "white", p: 3 }}>
            <CheckCircleIcon
              sx={{ color: "green", fontSize: 40, marginBottom: 2 }}
            />
            <Typography variant="h6">User Added Successfully</Typography>
            <Typography variant="body1">
              User has been added to the system and an email has been sent
              successfully.
            </Typography>
            <Button onClick={closeSuccessDialog}>Close</Button>
          </Box>
        </Box>
      </Modal>

      {/* Error modal */}
      <Modal open={isErrorDialogOpen} onClose={closeErrorDialog}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            top: "50%",
            left: "50%",
            textAlign: "center",
            borderRadius: "30%", // Adjust this as needed
          }}
        >
          <Box
            sx={{ width: 200, bgcolor: "white", p: 3, borderRadius: "25px" }}
          >
            <ErrorIcon sx={{ color: "red", fontSize: 40, marginBottom: 2 }} />
            <Typography variant="h6">Error</Typography>
            <Typography variant="body1">An error occurred</Typography>
            <Button onClick={closeErrorDialog}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCheckerClerk;
