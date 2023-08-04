import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; 
import { FaHome, FaUsers, FaTrain, FaDollarSign, FaFileAlt, FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa';
import '../navbar.css';

const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar">

        <div className="navbar-logo">
        <img src={logo} alt="Logo" className="navbar-logo" /> 
        </div>
        <ul className="navbar-menu">
        <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link" activeClassName="selected">
            <FaHome className="navbar-icon" />
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/station-masters" className="navbar-link">
              <FaUsers className="navbar-icon" />
              Station Masters
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/train-guards" className="navbar-link">
              <FaTrain className="navbar-icon" />
              Train Guards
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/earnings" className="navbar-link">
              <FaDollarSign className="navbar-icon" />
              Earnings
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/reports" className="navbar-link">
              <FaFileAlt className="navbar-icon" />
              Reports
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/complaints" className="navbar-link">
              <FaExclamationCircle className="navbar-icon" />
              Complaints
            </Link>
          </li>
        </ul>
        <div className="navbar-bottom">
          <Link to="/logout" className="navbar-link">
            <FaSignOutAlt className="navbar-icon" />
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
