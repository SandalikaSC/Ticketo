//import React from "react";
import React, { useState } from "react";
import CheckerClerkCard from '../../components/stationMaster/checkerclerkcard.jsx';
import "../../css/stationmaster.css";
import userImage from '../../assets/user2.png'; // Update the path as needed
import empImage from '../../assets/user3.png'; 
import emp2Image from '../../assets/user6.png';
import emp3Image from '../../assets/user5.png'; 
import emp4Image from '../../assets/user1.png';

const AddCheckerClerk = () => {

  const [searchInput, setSearchInput] = useState(""); // State for search input
  const checkersclerks = [
    {
      checkerclerk_image: userImage, // Use the imported image
      name: 'Shenil Perera',
      role: 'Ticket Clerk'
    },

    {
      checkerclerk_image: empImage, // Use the imported image
      name: 'Shanaka Silva',
      role: 'Ticket Checker'
    },

    {
      checkerclerk_image: emp2Image, // Use the imported image
      name: 'Prasad Cooray',
      role: 'Ticket Clerk'
    },

    {
      checkerclerk_image: emp4Image, // Use the imported image
      name: 'Ann Perera',
      role: 'Ticket Clerk'
    },

    {
      checkerclerk_image: emp3Image, // Use the imported image
      name: 'Samadhi Silva',
      role: 'Ticket Clerk'
    }
  ]

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter the checkersclerks based on search input
  const filteredCheckersClerks = checkersclerks.filter(
    (checkerclerk) =>
      checkerclerk.role.toLowerCase().includes(searchInput.toLowerCase()) ||
      checkerclerk.name.toLowerCase().includes(searchInput.toLowerCase())
  );


  

  return (
    <div className="main_container">
      <div className="left_container">
        <h1>Add Ticket Checkers/ Ticket Clerks</h1>

        <div className="form_container">
          <form className="addcheckerclerk_form">
            <label>
              First Name:
              <input type="text" className="box"/>
            </label>
            <label>
              Last Name:
              <input type="text" className="box"/>
            </label>
            <label>
              Job Position:
              <select className="box">
                <option value="clerk">Ticket Clerk</option>
                <option value="checker">Ticket Checker</option>
              </select>
            </label>
            <label>
              NIC:<br />
              <input type="text" className="box"/>
            </label>
            <label>
              Email:<br />
              <input type="text" className="box"/>
            </label>
            <label>
              Mobile No.:
              <input type="text" className="box"/>
            </label>
            <button className="addbutton"><b>Add</b></button>
          </form>
        </div>
      </div>

      <div className="right_container_scrollable-content">
        <div className="search-container">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search..."
          />
        </div>

        <div className="employee-card-container">
          {filteredCheckersClerks.map((checkerclerk, index) => (
            <CheckerClerkCard key={index} checkerclerk={checkerclerk} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AddCheckerClerk;