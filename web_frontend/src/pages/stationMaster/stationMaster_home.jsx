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
import Seasons from "./Season_ID_Issueing";
import TicketPurchase from "./TicketPurchase";

const stationMaster_home = () => {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<SMDashboard />} />

          <Route path="/addcheckerclerk" element={<AddCheckerClerk />} />
          <Route path="/SMDashboard" element={<SMDashboard />} />
          <Route path="/TrainDelays" element={<TrainDelays />} />
          <Route path="/checkerclerkcard" element={<CheckerClerkCard />} />
          <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
          <Route path="/display" element={<DisplayCheckersClerks />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/TicketPurchase" element={<TicketPurchase />} />

        </Routes>
      </Sidebar>
    </div>
  );
};
export default stationMaster_home;


