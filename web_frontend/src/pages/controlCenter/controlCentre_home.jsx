
import React from 'react';

//Control center imports for testing purposes only

// import Sidebar from './admin/adminsidebar';
// import Dashboard from './pages/admin/Dashboard';

import Sidebar from "../../components/controlCenter/CCSidebar";
import TrainInfo from "../controlCenter/TrainInfo";
import AssignGuards from "../controlCenter/AssignGuards";
import Delays from "../controlCenter/Delays";
import TrackTrains from "../controlCenter/TrackTrains";
import Stations from "../controlCenter/Stations";
import Settings from "../controlCenter/Settings";
import { Route, Routes } from "react-router-dom";
import "../../css/controlcenter.css";

import AddTrain from "./TrainInfo/AddTrain";

const controlCentre_home = () => {
  return (
    // <div>controlCentre_home</div>
    <Sidebar>
      <Routes>
        <Route path="/" element={<Delays />} />
        <Route path="/delays" element={<Delays />} />
        <Route path="/tracktrains" element={<TrackTrains />} />
        <Route path="/traininfo" element={<TrainInfo />} />
        <Route path="/assignGuards" element={<AssignGuards />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-train" element={<AddTrain />} />
      </Routes>
    </Sidebar>
  );
};

export default controlCentre_home;

