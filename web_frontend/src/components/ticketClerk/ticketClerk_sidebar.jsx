import React, { useState } from "react";
import {
  FaBars,
  FaTh,
  FaCalendar,
  FaCreditCard,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../common/logoText.png";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";
import { useNavigate } from "react-router-dom";

  const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/tc/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/tc/reservations",
      name: "Reservations",
      icon: <FaCalendar />,
    },
    {
      path: "/tc/season",
      name: "Season Cards",
      icon: <FaCreditCard />,
    },
    {
      path: "/tc/schedules",
      name: "Schedules",
      icon: <FaBook />,
    },
  ];
  const handleSignOut = async () => {
    try {
      // Send a sign-out request to your server if needed
      // For example, you can use axios like in your Header component
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      // For example, you might want to dispatch an action to update your Redux state.
      dispatch(authActions.logout());


      // Remove access token from local storage
      localStorage.removeItem("accessToken");

      // Redirect the user to the login page or home page
      history.push("/"); // If using React Router, uncomment this line
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            style={{ display: isOpen ? "block" : "none" }}
            src={Logo}
            width={125}
            alt="logo"
            className="logo"
          />
          <div
            style={{ marginLeft: isOpen ? "25px" : "0px", marginTop: "5px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}

        <div
          style={{
            marginTop: "100px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <button
            className="signout"
            style={{ display: "flex", alignItems: "center" }}
            onClick={handleSignOut}
          >
            <div className="icon" style={{ marginLeft: "14px" }}>
              {<FaSignOutAlt />}
            </div>
            <div
              style={{ display: isOpen ? "block" : "none", marginLeft: "10px" }}
              className="link_text"
            >
              Sign Out
            </div>
          </button>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
