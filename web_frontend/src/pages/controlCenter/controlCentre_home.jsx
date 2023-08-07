import React from 'react';
//Control center imports for testing purposes only

// import Sidebar from './admin/adminsidebar';
// import Dashboard from './pages/admin/Dashboard';
import Sidebar from '../../components/controlCenter/CCSidebar';
import TrainInfo from './TrainInfo';
import AssignGuards from './AssignGuards';
import Delays from './Delays';
import TrackTrains from './TrackTrains';
import Stations from './Stations';
import Settings from './Settings';
import { Route, Routes } from "react-router-dom";
import '../../css/controlcenter.css';

const controlCentre_home = () =>
{
    return (
        // <div>controlCentre_home</div>
        <Sidebar>
            <Routes>

                {/* Parindi
                    <Route path="/" e
                    lement={<Dashboard />} />
                    <Route path="/Dashboard" element={<Dashboard />} /> */}
                { }
                <Route path="/" element={<Delays />} />
                <Route path="/delays" element={<Delays />} />
                <Route path="/tracktrains" element={<TrackTrains />} />
                <Route path="/traininfo" element={<TrainInfo />} />
                <Route path="/assignGuards" element={<AssignGuards />} />
                <Route path="/stations" element={<Stations />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Sidebar>
    )
}

export default controlCentre_home