import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../../css/seasonRequest_displayForm.css';

const ApplicationData = ({ data  }) => {
   

    // useEffect(() => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     const headers = {
    //         Authorization: `Bearer ${accessToken}`,
    //     };

    //     axios
    //         .get('http://localhost:5000/api/season/getallseasonrequests', { headers })
    //         .then((response) => {
    //             setCardsData(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data', error);
    //         });
    // }, []);


        const handleApproveClick = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const headers = {Authorization: `Bearer ${accessToken}`,
        };                    console.log(data.seasonId);
   
                const response = await axios.post('http://localhost:5000/api/season/seasonaccept', { 
                    seasonId: data.seasonId,
                }, { headers });
    
                if (response.status === 200) {
                    Swal.fire('Success', 'Successfully approved', 'success');
                } else {
                    Swal.fire('Error', 'Failed to approve', 'error');
                }
            } catch (error) {
                console.error('Error approving season:', error);
                Swal.fire('Error', 'Failed to approve', 'error');
            }
        };
    
        const handleRejectClick = async () => {
            try {
                
                const accessToken = localStorage.getItem("accessToken");
                const headers = {Authorization: `Bearer ${accessToken}`,
        };

                const response = await axios.post('http://localhost:5000/api/season/seasonreject', {
                    seasonId: data.seasonId,
                },{ headers });
    
                if (response.status === 200) {
                    Swal.fire('Success', 'Successfully rejected', 'success');
                } else {
                    Swal.fire('Error', 'Failed to reject', 'error');
                }
            } catch (error) {
                console.error('Error rejecting season:', error);
                Swal.fire('Error', 'Failed to reject', 'error');
            }
        };
    


    
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
                <Button 
                    variant="danger" 
                    className="tc-form-approve-button"
                    onClick={handleApproveClick}
                >
                    Approve
                </Button>
                <Button 
                    variant="outline-danger" 
                    className="tc-form-reject-button"
                    onClick={handleRejectClick}
                >
                    Reject
                </Button>
            </Card.Footer>        
       
        </Card>
    );
};

export default ApplicationData;
