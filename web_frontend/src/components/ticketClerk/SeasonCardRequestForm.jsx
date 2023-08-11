import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../css/ticketClerk_applicationForm.css'; // Make sure the CSS file path is correct

const ApplicationForm = ({ data }) => {
    return (
        <div className="tc-application-form">
            <h3 className="tc-form-heading">Season ID Card Request Information</h3>
            <Form>
                <Form.Group controlId="fullName">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control type="text" value={data.fullName} className="tc-custom-form-control" readOnly />
                </Form.Group>
                <Form.Group controlId="nameWithInitials">
                    <Form.Label>Name with Initials:</Form.Label>
                    <Form.Control type="text" value={data.nameWithInitials} readOnly />
                </Form.Group>
                <Form.Group controlId="designation">
                    <Form.Label>Designation:</Form.Label>
                    <Form.Control type="text" value={data.designation} readOnly />
                </Form.Group>
                <Form.Group controlId="telephone_no">
                    <Form.Label>Telephone Number:</Form.Label>
                    <Form.Control type="tel" value={data.telephone_no} readOnly />
                </Form.Group>
                <Form.Group controlId="permanent_address">
                    <Form.Label>Permanent Address:</Form.Label>
                    <Form.Control type="text" value={data.permanent_address} readOnly />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={data.email} readOnly />
                </Form.Group>
                <Form.Group controlId="nic">
                    <Form.Label>National Identity Card No:</Form.Label>
                    <Form.Control type="text" value={data.nic} readOnly />
                </Form.Group>
                <Form.Group controlId="work_place">
                    <Form.Label>Institution/Work Place:</Form.Label>
                    <Form.Control type="text" value={data.work_place} readOnly />
                </Form.Group>
                <Form.Group controlId="work_place_address">
                    <Form.Label>Institution/Work Place Address:</Form.Label>
                    <Form.Control type="text" value={data.work_place_address} readOnly />
                </Form.Group>
                <Form.Group controlId="id_photograph">
                    <Form.Label>Photograph:</Form.Label>
                    <Form.Control type="file" value={data.id_photograph} readOnly />
                </Form.Group>
                <Form.Group controlId="application_photograph">
                    <Form.Label>Application Form Photograph:</Form.Label>
                    <Form.Control type="file" value={data.application_photograph} readOnly />
                </Form.Group>
              

                <Button variant="danger" className="tc-form-approve-button">
                    Approve
                </Button>
                <Button variant="outline-danger" className="tc-form-reject-button">
                    Reject
                </Button>
            </Form>
        </div>
    );
};

export default ApplicationForm;
