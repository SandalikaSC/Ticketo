import React from "react";
//import displayCheckersClerks from 'displayCheckersClerks';
import { Route, Routes } from "react-router-dom";
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddCheckerClerk from "./addCheckerClerk";
import CheckerClerkCard from "./checkerClerkCard";
//import DetailCheckerClerk from "./detailsCheckersClerks";
import DisplayCheckersClerks from "./displayCheckersClerks";
import Sidebar from "../../components/stationMaster/SSSidebar";
import TrainDelays from "./TrainDelays";
import SMDashboard from "./SMDashboard";
import EmployeeDetails from "./EmployeeDetails";
const stationMaster_home = () => {
  return (
    <div>
      <Sidebar>
        <Routes>
        <Route path="/" element={<SMDashboard />} />

          <Route path="/addcheckerclerk" element={<AddCheckerClerk />} />
          <Route path="/SMDashboard" element={<SMDashboard />} />
          <Route path="/TrainDelays" element={<TrainDelays/>} />

         <Route path="/checkerclerkcard" element={<CheckerClerkCard />} />
          <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
          <Route path="/display" element={<DisplayCheckersClerks />} />
        </Routes>
      </Sidebar>
    </div>
  );
};
export default stationMaster_home;

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
