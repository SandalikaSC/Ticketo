import React, { useState } from 'react';
import NotificationComponent from "../../components/common/Notification"; // Renamed import

const TicketClerkHome = () =>
{
    const [selectedType, setSelectedType] = useState(); // Default value
    const [showNotification, setShowNotification] = useState(false); // State to control notification display

    const handleNotification = (type) =>
    {
        setSelectedType(type);
        if (type)
            setShowNotification(true);
        else
            setShowNotification(false);
    };

    const getMessage = () =>
    {
        switch (selectedType)
        {
            case 'success':
                return 'Successful message';
            case 'error':
                return 'Error notification';
            case 'warning':
                return 'Warning notification';
            default:
                return '';
        }
    };

    const handleNotificationClose = () =>
    {
        setShowNotification(false);
    };

    return (
        <div>
            <h1>Testing in Ticket Clerk Page</h1>
            <button onClick={() => handleNotification('success')}>Show Success</button>
            <button onClick={() => handleNotification('warning')}>Show Warning</button>
            <button onClick={() => handleNotification('error')}>Show Error</button>
            {showNotification && (
                <NotificationComponent type={selectedType} message={getMessage()} onClose={handleNotificationClose} />
            )}
        </div>
    );
};

export default TicketClerkHome;
