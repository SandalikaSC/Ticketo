//import React from "react";
import React, { useState } from "react";
//import CheckerClerkCard from "../../components/stationMaster/checkerclerkcard.jsx";
import axios from "axios";
import "../../css/stationmaster.css";
// import userImage from "../../assets/user2.png"; // Update the path as needed
// import empImage from "../../assets/user3.png";
// import emp2Image from "../../assets/user6.png";
// import emp3Image from "../../assets/user5.png";
// import emp4Image from "../../assets/user1.png";
import EmpCard from "../../components/stationMaster/EmpCard"; // Update the path to EmpCard component if necessary
import "../../css/sm_dashboard.css";
import userImage from "../../assets/user2.png"; // Update the path as needed
import empImage from "../../assets/user3.png";
import empoImage from "../../assets/user6.png";
import usersImage from "../../assets/user7.png";

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

  const [searchInput, setSearchInput] = useState(""); // State for search input
  // const checkersclerks = [
  //   {
  //     checkerclerk_image: userImage, // Use the imported image
  //     name: "Shenil Perera",
  //     role: "Ticket Clerk",
  //   },

  //   {
  //     checkerclerk_image: empImage, // Use the imported image
  //     name: "Shanaka Silva",
  //     role: "Ticket Checker",
  //   },

  //   {
  //     checkerclerk_image: emp2Image, // Use the imported image
  //     name: "Prasad Cooray",
  //     role: "Ticket Clerk",
  //   },

  //   {
  //     checkerclerk_image: emp4Image, // Use the imported image
  //     name: "Ann Perera",
  //     role: "Ticket Clerk",
  //   },

  //   {
  //     checkerclerk_image: emp3Image, // Use the imported image
  //     name: "Samadhi Silva",
  //     role: "Ticket Clerk",
  //   },
  // ];

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

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter the checkersclerks based on search input
  // const filteredCheckersClerks = checkersclerks.filter(
  //   (checkerclerk) =>
  //     checkerclerk.role.toLowerCase().includes(searchInput.toLowerCase()) ||
  //     checkerclerk.name.toLowerCase().includes(searchInput.toLowerCase())
  // );

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
        {/* <h1>Add Ticket Checkers/ Ticket Clerks dvevadc</h1> */}

        <div className="form_container">
          <form className="addcheckerclerk_form">
            <label>
              First Name:
              <input type="text" className="box" required />
            </label>
            <label>
              Last Name:
              <input type="text" className="box" required />
            </label>
            <label>Email:</label>
            <input type="email" />
            <label>
              Job Position:
              <select className="box" required>
                <option value="" disabled selected>
                  Select job role
                </option>
                <option value="clerk">Ticket Clerk</option>
                <option value="checker">Ticket Checker</option>
              </select>
            </label>
            <label>
              NIC:
              <br />
              <input type="text" className="box" required minLength={10} />
            </label>
            <label>
              Email:
              <br />
              <input
                type="email"
                className="box"
                required
                placeholder="Please enter a valid email address"
              />
            </label>
            <label>
              Mobile No.:
              <input
                type="text"
                className="box"
                placeholder="Please enter a valid mobile number with 10 digits"
                required
                minLength={10}
                pattern="[0-9]+"
                title="Please enter a valid mobile number with 10 digits"
              />
            </label>
            <button className="addbutton">
              <b>Add</b>
            </button>
          </form>
        </div>
      </div>

      <div className="right_container_scrollable-content">
        <div className="employee-details-container">
          {/* <h1 className="section-heading">Employee Details</h1> */}
          <h2 className="sub-section-heading"> Galle Railway Station</h2>

          <div className="employee-card-container">
            {employees.map((employee, index) => (
              <EmpCard key={index} employee={employee} />
            ))}
          </div>
        </div>
        {/* <div className="search-container">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
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
        </div> */}

        {/* Other checker_clerk_card elements... */}
        {/* 
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
        )} */}
      </div>
    </div>
  );
};

export default AddCheckerClerk;
