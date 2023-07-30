import React from 'react';
import Sidebar from '../../components/admin/adminsidebar';
import Dashboard from '../admin/Dashboard';
import { Route, Routes } from "react-router-dom";

const admin_home = () =>
{
    return (
        <Sidebar>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
        </Sidebar>
    )
}

export default admin_home