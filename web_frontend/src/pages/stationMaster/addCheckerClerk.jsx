import React, { useState } from "react";
import axios from "axios";
import "../../css/stationmaster.css";

const AddCheckerClerk = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [deletepopupVisible, setDeletePopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobPosition: "clerk",
    nic: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({});

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const opendeletePopup = () => {
    setDeletePopupVisible(true);
  };

  const closedeletePopup = () => {
    setDeletePopupVisible(false);
  };

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
      const response = await axios.post(
        "http://backend-address/add-user", // Replace with actual backend API address
        formData
      );
      console.log("Data sent to backend:", response.data);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        jobPosition: "clerk",
        nic: "",
        mobileNumber: "",
      });

      // Optionally show a success message or perform other actions
    } catch (error) {
      console.error("Error sending data to backend:", error);
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

  return (
    <div className="main_container">
      <div className="left_container">
        <h1>Add Ticket Checkers/ Ticket Clerks</h1>

        <div className="form_container">
          <form className="form">
            <label>
              First Name:
              <input type="text" />
            </label>
            <label>
              Last Name:
              <input type="text" />
            </label>
            <label>Email:</label>
            <input type="email" />
            <label>
              Job Position:
              <select>
                <option value="clerk">Ticket Clerk</option>
                <option value="checker">Ticket Checker</option>
              </select>
            </label>
            <label>
              NIC:
              <br />
              <input type="text" />
            </label>
            <label>
              Mobile No.:
              <input type="text" />
            </label>
            <button>Add</button>
          </form>
        </div>
      </div>

      <div className="right_container_scrollable-content">
        <div className="search-container">
          <input
            type="text"
            //value={inputValue}
            //onChange={handleInputChange}
            placeholder="Search..."
          />
        </div>

        <div className="checker_clerk_card">
          <p>
            <b>Subodhini Hegodarachchi</b>
          </p>
          <p>Ticket Clerk</p>
          <br></br>
          <button className="view_button" onClick={openPopup}>
            View
          </button>
        </div>

        <div className="checker_clerk_card">
          <p>
            <b>Waruna Samarasinghe</b>
          </p>
          <p>Ticket Clerk</p>
          <br></br>
          <button className="view_button">View</button>
        </div>

        <div className="checker_clerk_card">
          <p>
            <b>Priyantha Perera</b>
          </p>
          <p>Ticket Checker</p>
          <br></br>
          <button className="view_button">View</button>
        </div>

        {/* Other checker_clerk_card elements... */}

        {popupVisible && (
          <div className="popup">
            <div className="popup-content">
              <p>
                <b>Subodhini Hegodarachchi</b>
              </p>
              <p>Ticket Clerk</p>
              <br></br>
              <button className="view_button" onClick={closePopup}>
                Close
              </button>
              <br></br>
              <button className="delete_button" onClick={opendeletePopup}>
                Delete staff person
              </button>
            </div>
          </div>
        )}

        {deletepopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <p>Delete Subodhini Hegodarachchi from staff?</p>
              <br></br>
              <button className="view_button" onClick={closedeletePopup}>
                Cancel
              </button>
              <br></br>
              <button className="delete_button" onClick={closedeletePopup}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCheckerClerk;
