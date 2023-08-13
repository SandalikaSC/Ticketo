import React, { useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import '../../css/seasonCardRequests.css'; // Make sure the CSS file path is correct
import ApplicationData from '../../components/ticketClerk/SeasonCardRequest_Data';


const SeasonCardRequests = () => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);

   
    const handleTabClick = (selectedTabType) => {
        setSelectedType(selectedTabType);
        setSelectedStatus(''); // Clear selected status
        setSelectedTimePeriod('');
        setSelectedCard(null); // Reset selected card when changing tabs
    };

    const resetSortingSelectBoxes = () => {
        setSelectedTimePeriod('');
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
    const renderCards = () => {
        // Simulated data for demonstration
        const cardsData = [
            {
                name: 'Nimal Supun Banadara',
                type: 'Government',
                email: 'nimal88sp@gmail.com',
                phoneNumber: '091-2236585',
                status: 'Pending',
            
            },
            {
                name: 'Sithmi Nirasha Weerawardhana',
                type: 'Private',
                email: 'sithmiweera99@gmail.com',
                phoneNumber: '076-5241325',
                status: 'Approved',
                
            },
            {
                name: 'Anirudh Weerachandar',
                type: 'Government',
                email: 'anichandr97@gmail.com',
                phoneNumber: '070-2635596',
                status: 'Pending',
                
            },
            {
                name: 'Sandalika Imesha',
                type: 'Private',
                email: 'sandai00@gmail.com',
                phoneNumber: '077-5263569',
                status: 'Approved',
                
            },
            {
                name: 'Sunil Vithana',
                type: 'Government',
                email: 'sunilvithanagalle@gmail.com',
                phoneNumber: '077-5263449',
                status: 'Approved',
                
            },

           
        ];

        // Filter cards based on selected type
        const filteredCards = selectedType
        ? cardsData.filter(card => card.type === selectedType && (selectedStatus === '' || card.status === selectedStatus))
        : cardsData;

        
        return filteredCards.map((card, index) => (
            <div className={`tc-card ${selectedCard === card ? 'selected' : ''}`} key={index}>
            <div className="tc-card-body">
            <div className="tc-card-info">
                    <span className="tc-card-label">Name:</span>
                    <span>{card.name}</span>
            </div>
                
                    <div className="tc-card-info">
                        <span className="tc-card-label">Type:</span>
                        <span>{card.type}</span>
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
                        <span style={{ color: card.status === 'Pending' || card.status === 'Approved' ? '#3D51A9' : 'inherit' }}>{card.status}</span>
                    </div>
                 
                </div>
                <Button variant="danger" className="tc-approve-button" onClick={() => handleViewMoreClick(card)}>
                    View More
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
                    <div className="tc-application-container"  >
        <ApplicationData data={selectedCard ||{} }/>
    </div>
                     
                </div>
            </div>
        </div>
    );
};

export default SeasonCardRequests;
