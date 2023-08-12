import React, { useState } from "react";
import "../../css/stationmaster.css";


const AddCheckerClerk = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [deletepopupVisible, setDeletePopupVisible] = useState(false);

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
            <label>
              Job Position:
              <select>
                <option value="clerk">Ticket Clerk</option>
                <option value="checker">Ticket Checker</option>
              </select>
            </label>
            <label>
              NIC:<br />
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
          <p><b>Subodhini Hegodarachchi</b></p>
          <p>Ticket Clerk</p>
          <br></br>
          <button className="view_button" onClick={openPopup}>View</button>
        </div>

        <div className="checker_clerk_card">
          <p><b>Waruna Samarasinghe</b></p>
          <p>Ticket Clerk</p>
          <br></br>
          <button className="view_button" >View</button>
        </div>

        <div className="checker_clerk_card">
          <p><b>Priyantha Perera</b></p>
          <p>Ticket Checker</p>
          <br></br>
          <button className="view_button" >View</button>
        </div>

        {/* Other checker_clerk_card elements... */}

        {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p><b>Subodhini Hegodarachchi</b></p>
            <p>Ticket Clerk</p><br></br>
            <button className="view_button" onClick={closePopup}>Close</button><br></br>
            <button className="delete_button" onClick={opendeletePopup}>Delete staff person</button>
          </div>
        </div>
      )}

      {deletepopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>Delete Subodhini Hegodarachchi from staff?</p><br></br>
            <button className="view_button" onClick={closedeletePopup}>Cancel</button><br></br>
            <button className="delete_button" onClick={closedeletePopup}>Delete</button>
          </div>
        </div>
      )} 
     
      </div>
    </div>
  );
};

export default AddCheckerClerk;