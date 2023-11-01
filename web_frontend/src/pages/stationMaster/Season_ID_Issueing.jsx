import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import '../../css/seasonCardRequests.css'; // Make sure the CSS file path is correct
import ApplicationData from '../../components/stationMaster/SeasonCardRequest_Data';

const SeasonCardRequests = () => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardsData, setCardsData] = useState([]);

    const handleTabClick = (selectedTabType) => {
        setSelectedType(selectedTabType);
        setSelectedStatus(''); // Clear selected status
        setSelectedTimePeriod('');
        setSelectedCard(null); // Reset selected card when changing tabs
    };

    const handleTypeChange = (event) => {
        const type = event.target.value;
        setSelectedType(type);
        setSelectedStatus(''); // Reset selected status when changing type
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

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios.get('http://localhost:5000/api/season/getallseasonrequests', { headers })
            .then(response => {
                setCardsData(response.data);
                console.log(response.data); // Log the received data
            })
            .catch(error => {
                console.error('Error fetching data', error)
            });

    }, []);

    const renderCards = () => {
        return (
            <div className="tc-card-list">
                {cardsData.map((card, index) => (
                    <div className={`tc-card ${selectedCard === card ? 'selected' : ''}`} key={index}>
                        <div className="tc-card-body">
                            <div className="tc-card-info">
                                <span className="tc-card-label">Name:</span>
                                <span>{card.user.firstName}</span>
                            </div>

                            <div className="tc-card-info">
                                <span className="tc-card-label">Type:</span>
                                <span>{card.designation}</span>
                            </div>

                            <div className="tc-card-info">
                                <span className="tc-card-label">Email:</span>
                                <span>{card.user.email}</span>
                            </div>

                            <div className="tc-card-info">
                                <span className="tc-card-label">Phone Number:</span>
                                <span>{card.user.mobileNumber}</span>
                            </div>

                            <div className="tc-card-info">
                                <span className="tc-card-label">Status:</span>
                                <span style={{ color: card.approvedStatus === 'Pending' || card.status === 'Approved' ? '#3D51A9' : 'inherit' }}>{card.approvedStatus}</span>
                            </div>
                        </div>
                        <Button variant="danger" className="tc-approve-button" onClick={() => handleViewMoreClick(card)}>
                            View More
                        </Button>
                    </div>
                ))}
            </div>
        );
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
                            {renderCards()}
                        </div>
                    </div>
                    <div className="tc-application-container"  >
                        <ApplicationData data={selectedCard || {}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeasonCardRequests;
