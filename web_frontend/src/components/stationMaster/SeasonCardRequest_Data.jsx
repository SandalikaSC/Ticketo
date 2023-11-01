import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../../css/seasonRequest_displayForm.css';

const ApplicationData = ({ data }) => {
    const isPending = data.approvedStatus === 'PENDING';
    console.log(data);
    return (
        <Card className="tc-application-form">
            <Card.Body className='tc-app-card-body'>
                <h3 className="tc-form-heading">Season ID Card Request Information</h3>
                <div className="tc-data-field">
                    {data.approvedStatus}
                </div>
                <div className="tc-data-field">
                    <strong>Full Name:</strong> {data.user.firstName} {data.user.lastName}
                </div>
            
                <div className="tc-data-field">
                    <strong>Telephone Number:</strong> {data.user.mobileNumber}
                </div>
                <div className="tc-data-field">
                    <strong>Email:</strong> {data.user.email}
                </div>
                <div className="tc-data-field">
                    <strong>Designation:</strong> {data.designation}
                </div>
                {/* <div className="tc-data-field">
                    <strong>Workplace Address:</strong> {data.workPlaceAddress}
                </div> */}
              
                <div className="tc-data-field">
                    <strong>National Identity Card No:</strong> {data.user.nic}
                </div>
                <div className="tc-data-field">
                    <strong>Institution/Work Place:</strong> {data.workplace}
                </div>
                <div className="tc-data-field">
                    <strong>Institution/Work Place Address:</strong> {data.workplaceAddress}
                </div>

                {/* <div className="tc-data-field">
                    <strong>Photograph:</strong> {data.id_photograph}
                </div>
                <div className="tc-data-field">
                    <strong>Application Form Photograph:</strong> {data.application_photograph}
                </div> */}
                
            </Card.Body>
           <Card.Footer  className="tc-app-card-footer">
                <Button variant="danger" className="tc-form-approve-button" disabled={!isPending}>
                    Approve
                </Button>
                <Button variant="outline-danger" className="tc-form-reject-button">
                    Reject
                </Button>
            </Card.Footer>        
       
        </Card>
    );
};

export default ApplicationData;
