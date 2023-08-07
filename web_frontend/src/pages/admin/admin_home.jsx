import React from 'react';
import Sidebar from '../../components/admin/adminsidebar';
import Dashboard from './Dashboard';
import StationMaster from './StationMaster';
import { Route, Routes } from "react-router-dom";

const admin_home = () =>
{
    return (
        <Sidebar>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stationmaster" element={<StationMaster/>} />

            </Routes>
        </Sidebar>
    )
}

export default admin_home