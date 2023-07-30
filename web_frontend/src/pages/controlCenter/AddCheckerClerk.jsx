import React , { useState } from "react";
/*import Logo from '../common/logoText.png';*/
import './AddCheckerClerk.css';

const AddCheckerClerk = () => {
    return (
        <div>
            <h1>Add Ticket Checkers/ Ticket Clerks</h1>
        
            <div className="form_container">
                <form className="form">
                <label>Add photo:
                <input type="image" src=" " alt="" width="48" height="48"/>
                </label>
               
                <label>Full Name:
                <input type="text"/>
                </label>
                <label>Job Position:
                <select>
                <option value="">Ticket Clerk</option>
                <option value="">Ticket Checker</option>
                </select>
                </label>
                <label>Date of Birth:
                <input type="date"/>
                </label>
                
                <label>Username:
                <input type="text"/>
                </label>
                <label>Email Address:
                <input type="email"/>
                </label>
                <label>Password:
                <input type="password"/>
                </label>
                <label>Confirm Password:
                <input type="password"/>
                </label>
                <button>Add</button>
                </form>
            </div>
        </div>
        
    );
};



export default AddCheckerClerk;