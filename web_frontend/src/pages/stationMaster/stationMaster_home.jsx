import React from 'react'
import addCheckerClerk from './addCheckerClerk';
//import displayCheckersClerks from 'displayCheckersClerks';
import { Route, Routes } from "react-router-dom";
//import { BrowserRouter as Router, Route } from 'react-router-dom';


const stationMaster_home = () =>
{
    return (
        <div>
           <p>stationMaster_home</p>
           
           <Routes>
           <Route path="/addCheckerClerk" element={<addCheckerClerk/>} />
           </Routes>

        </div>
    )   

}     
export default stationMaster_home


//import logo from './logo.svg';
//import './App.css';
//import PartOne from './components/PartOne'

//function App() {
  //return (
    //<div className="App">
      
   // <h1>This is my first react project.</h1>
    //<PartOne/>
    //</div>
 // );
//}

//export default App;