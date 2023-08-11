import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import '../../css/seasonCardRequests.css'; // Make sure the CSS file path is correct
import ApplicationForm from '../../components/ticketClerk/SeasonCardRequestForm';

const SeasonCardRequests = () => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

    const handleTabClick = (selectedTabType) => {
        setSelectedType(selectedTabType);
        setSelectedTimePeriod('');
        setSelectedCard(null); // Reset selected card when changing tabs
    };

    const resetSortingSelectBoxes = () => {
        setSelectedTimePeriod('');
    };

    const handleTypeChange = (event) => {
        const type = event.target.value;
        setSelectedType(type);
        setSelectedTimePeriod('');
        setSelectedCard(null); // Reset selected card when changing type
    };

    const handleTimePeriodChange = (event) => {
        const timePeriod = event.target.value;
        setSelectedTimePeriod(timePeriod);
    };
    const handleViewMoreClick = (card) => {
        setSelectedCard(card);
    };
    const renderCards = () => {
        // Simulated data for demonstration
        const cardsData = [
            {
                name: 'John Doe',
                type: 'Government',
                id: '123456',
                userName: 'john123',
                driveLink: '#',
                email: 'john@example.com',
                phoneNumber: '123-456-7890',
                status: 'Pending',
                expirationDate: '2023-12-31',
            },
            {
                name: 'Jane Smith',
                type: 'Private',
                id: '789012',
                userName: 'jane456',
                driveLink: '#',
                email: 'jane@example.com',
                phoneNumber: '987-654-3210',
                status: 'Approved',
                expirationDate: '2024-03-15',
            },
            {
                name: 'Michael Johnson',
                type: 'Government',
                id: '345678',
                userName: 'michael789',
                driveLink: '#',
                email: 'michael@example.com',
                phoneNumber: '555-123-4567',
                status: 'Pending',
                expirationDate: '2023-10-20',
            },
            // Add more card data objects here
        ];

        // Filter cards based on selected type
        const filteredCards = selectedType
            ? cardsData.filter(card => card.type === selectedType)
            : cardsData;

        return filteredCards.map((card, index) => (
            <div className={`tc-card ${selectedCard === card ? 'selected' : ''}`} key={index}>
                <div className="tc-card-header">
                    <span className="tc-card-label">Name:</span>
                    <span>{card.name}</span>
                </div>
                <div className="tc-card-body">
                    <div className="tc-card-info">
                        <span className="tc-card-label">Type:</span>
                        <span>{card.type}</span>
                    </div>
                    <div className="tc-card-info">
                        <span className="tc-card-label">ID:</span>
                        <span>{card.id}</span>
                    </div>
                    <div className="tc-card-info">
                        <span className="tc-card-label">User Name:</span>
                        <span>{card.userName}</span>
                    </div>
                    <div className="tc-card-info">
                        <span className="tc-card-label">Drive Link:</span>
                        <span><a href={card.driveLink}>Drive Link</a></span>
                    </div>
                    <div className="tc-card-info">
                        <span className="tc-card-label">Email:</span>
                        <span>{card.email}</span>
                    </div>
                    <div className="tc-card-info">
                        <span className="tc-card-label">Phone Number:</span>
                        <span>{card.phoneNumber}</span>
                    </div>
                    <div className="tc-card-info">
                        <span className="tc-card-label">Status:</span>
                        <span>{card.status}</span>
                    </div>
                    <div className="tc-card-info">
                        <span className="tc-card-label">Expiration Date:</span>
                        <span>{card.expirationDate}</span>
                    </div>
                </div>
                <Button variant="danger" className="tc-approve-button" onClick={() => handleViewMoreClick(card)}>
                    View More Details <FaCheck className="tc-approve-icon" />
                </Button>
            </div>
        ));
    };

    return (
        <div className="tc-season-container">
            <div className="tc-season-cards">
                <h2 className="tc-main-heading">Season Card Requests</h2>
                <div className='tc-tab-application-container'>
                    <div className="tc-tab-container">
                        <div className="tc-tab-bar">
                            <div className={`tc-tab ${selectedType === '' ? 'active' : ''}`} onClick={() => handleTabClick('')}>
                                All Requests
                            </div>
                            <div className={`tc-tab ${selectedType === 'Pending' ? 'active' : ''}`} onClick={() => handleTabClick('Pending')}>
                                Pending Requests
                            </div>
                            <div className={`tc-tab ${selectedType === 'Approved' ? 'active' : ''}`} onClick={() => handleTabClick('Approved')}>
                                Approved Requests
                            </div>
                        </div>
                        <div className="tc-tab-content">
                            <div className="tc-sort-bar">
                                <span className="tc-sort-label">Sort By:</span>
                                <Form.Group controlId="sortType">
                                    <Form.Label className="tc-sort-label">Type:</Form.Label>
                                    <Form.Control as="select" className="tc-sort-select" onChange={handleTypeChange}>
                                        <option value="">All</option>
                                        <option value="Government">Government</option>
                                        <option value="Private">Private</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="sortClass">
                                    <Form.Label className="tc-sort-label">Class:</Form.Label>
                                    <Form.Control as="select" className="tc-sort-select">
                                        <option value="">All</option>
                                        <option value="2nd Class">2nd Class</option>
                                        <option value="3rd Class">3rd Class</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="sortTimePeriod">
                                    <Form.Label className="tc-sort-label">Time Period:</Form.Label>
                                    <Form.Control as="select" className="tc-sort-select" value={selectedTimePeriod} onChange={handleTimePeriodChange}>
                                        <option value="">All</option>
                                        {selectedType === 'Private' || selectedType === 'Government' || selectedType === '' ? <option value="1 Month">1 Month</option> : null}
                                        {selectedType === 'Government' || selectedType === '' ? <option value="3 Months">3 Months</option> : null}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="tc-card-container">
                                <div className="tc-card-list">
                                    {renderCards()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tc-application-form-container">
                        {/* Display the ApplicationForm component here */}
                          <ApplicationForm data={selectedCard || {}} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeasonCardRequests;
