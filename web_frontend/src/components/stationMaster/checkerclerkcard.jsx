import React, { useState } from "react";
// import './stationmaster.css';

const CheckerClerkCard = ({ checkerclerk }) => {

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
    <div className="checkerclk_card">
      <img src={checkerclerk.checkerclerk_image} alt={checkerclerk.name} /><br />
      <div className='cardword_contents_container'>
        <div className='cardword_contents'>
          <h2>{checkerclerk.name}</h2>
          <p>{checkerclerk.role}</p>
        </div>
      </div>
      <button className='view_button' onClick={openPopup}>View</button>

      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p><b>{checkerclerk.name}</b></p>
            <p>{checkerclerk.role}</p>
            <p>jkaiuornkla@gmail.com</p>
            <p>0788888888</p><br></br>
            <div className="button_container">
            <button className="view_button" onClick={closePopup}>Close</button><br />
            <button className="delete_button" onClick={opendeletePopup}>Delete staff person</button>
            </div>
          </div>
        </div>
      )}

      {deletepopupVisible && (
        <div className="popup2">
          <div className="popup-content">
            <p>Delete {checkerclerk.name} from staff?</p><br />
            <div className="button_container">
            <button className="view_button" onClick={closedeletePopup}>Cancel</button><br />
            <button className="delete_button" onClick={closedeletePopup}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckerClerkCard;