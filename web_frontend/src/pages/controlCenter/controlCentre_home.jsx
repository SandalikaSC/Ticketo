import React from "react";

//Control center imports for testing purposes only

// import Sidebar from './admin/adminsidebar';
// import Dashboard from './pages/admin/Dashboard';

import Sidebar from "../../components/controlCenter/CCSidebar";
import TrainInfo from "../controlCenter/TrainInfo";
import AssignGuards from "../controlCenter/AssignGuards";
import Delays from "./Delays/Delays";
import DelayReports from "./Delays/DelayReports";
import TrackTrains from "../controlCenter/TrackTrains";
import Stations from "../controlCenter/Stations";
import { Route, Routes } from "react-router-dom";
import "../../css/controlcenter.css";
import DelayPage from "./Delays/DelayPage";
import AddTrain from "../controlCenter/TrainInfo/AddTrain";

const controlCentre_home = () => {
  return (
    // <div>controlCentre_home</div>
    <Sidebar>
      <Routes>
        <Route path="/" element={<Delays />} />
        <Route path="/delays" element={<Delays />} />
        <Route path="/delayreports" element={<DelayReports />} />
        <Route path="/resolve" element={<DelayPage />} />
        <Route path="/tracktrains" element={<TrackTrains />} />
        <Route path="/traininfo/*" element={<TrainInfo />} />
        <Route path="/traininfo/add-train" element={<AddTrain />} />
        <Route path="/assignGuards" element={<AssignGuards />} />
        <Route path="/stations" element={<Stations />} />
      </Routes>
    </Sidebar>
  );
};

export default controlCentre_home;
