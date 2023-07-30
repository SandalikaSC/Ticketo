import React , { useState } from "react";
import './src/css/AddCheckerClerk.css';

const AddCheckerClerk = () => {
    return (
        <div>
            <h1>Add Ticket Checkers/Clerks</h1>
        

        <form>
        <label>Add photo:
        <input type="image" src=" " alt="Submit" width="48" height="48"/>
        </label>
        <label>Full Name:
        <input type="text"/>
        </label>
        <label>Job Position:
        <input type="text"/>
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
        </form>

        </div>
        
    );
};



export default AddCheckerClerk;