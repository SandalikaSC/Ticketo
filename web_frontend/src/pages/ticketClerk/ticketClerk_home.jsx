import React from 'react';
import Sidebar from '../../components/ticketClerk/ticketClerk_sidebar.jsx'
import Dashboard from './Dashboard';
import Reservations from './Reservations';
import Season_Card_Issueing from './Season_ID_Issueing';
import Reports from './Reports';
import { Route, Routes } from 'react-router-dom';


const TicketClerkHome = () => {
    

    return (
        
        <Sidebar>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/season" element={<Season_Card_Issueing />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </Sidebar>
    );
};

export default TicketClerkHome;