import React from "react";
/*import Logo from '../common/logoText.png';*/
import "../../css/stationmaster.css";

const DetailCheckerClerk = () => {
  return (
    <div>
      <h1>Add Ticket Checkers/ Ticket Clerks</h1>

      <div className="form_container">
        <form className="form">
          <label>
            First Name:
            <input type="text" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default DetailCheckerClerk;
