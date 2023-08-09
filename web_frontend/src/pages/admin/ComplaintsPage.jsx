import React, { useState } from 'react';
import ComplaintCard from '../../components/admin/ComplaintCard';
import ResolvedComplaintCard from '../../components/admin/ResolvedComplaintCard';
import ResolveForm from '../../components/admin/ResolveForm';
import '../../css/admin_complaints.css';

const ComplaintsPage = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedComplaint(null);
  };

  const handleResolveClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  return (
    <div className="complaints-page">
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => handleTabChange('new')}
        >
          New Complaints
        </button>
        <button
          className={`tab-btn ${activeTab === 'resolved' ? 'active' : ''}`}
          onClick={() => handleTabChange('resolved')}
        >
          Resolved Complaints
        </button>
      </div>

      <div className="complaints-container">
        {activeTab === 'new' ? (
          <>
            {selectedComplaint ? (
              <ResolveForm
                complaintData={selectedComplaint}
                onResolve={(resolvedData) => {
                  // Handle resolved data
                  setSelectedComplaint(null);
                }}
              />
            ) : (
              <>
                <ComplaintCard
                  id="021"
                  complaintBy="Nimal Perera"
                  imageUrl="../../common/user1.png"
                  date="2023/08/06"
                  complaint="Train schedule not loaded."
                  onResolve={() => handleResolveClick("021")}
                />
                <ComplaintCard
                  id="022"
                  complaintBy="Lalith De Silva"
                  imageUrl="../common/user2.png"
                  date="2023/08/10"
                  complaint="Delayed train .Not informed"
                  onResolve={() => handleResolveClick("022")}
                />
                <ComplaintCard
                  id="023"
                  complaintBy="Krishan Perera"
                  imageUrl="../common/user3.png"
                  date="2023/08/06"
                  complaint="Train schedule not loaded."
                  onResolve={() => handleResolveClick("023")}
                />
                <ComplaintCard
                  id="024"
                  complaintBy="Kokila De Silva"
                  imageUrl="../common/user2.png"
                  date="2023/08/06"
                  complaint="Train delay not notified"
                  onResolve={() => handleResolveClick("022")}
                />
                <ComplaintCard
                  id="025"
                  complaintBy="Ashen Perera"
                  imageUrl="../../common/user1.png"
                  date="2023/08/06"
                  complaint="Train schedule not loaded."
                  onResolve={() => handleResolveClick("021")}
                />
                <ComplaintCard
                  id="026"
                  complaintBy="Joel Fernando"
                  imageUrl="../common/user2.png"
                  date="2023/08/10"
                  complaint="Delayed train .Not informed"
                  onResolve={() => handleResolveClick("022")}
                />
              </>
            )}
          </>
        ) : (
          <>
            <ResolvedComplaintCard
              id="002"
              complaintBy="Jane Smith"
              imageUrl="../common/user4.png"
              date="2023/08/03"
              complaint="Ticket refund not received."
              actionTaken="Processed refund and notified the user."
            />
            <ResolvedComplaintCard
              id="004"
              complaintBy="Subodinie Chathurajika"
              imageUrl="../common/user1.png"
              date="2023/07/14"
              complaint="Unauthorized transaction."
              actionTaken="Investigated and refunded the amount."
            />
            <ResolvedComplaintCard
              id="005"
              complaintBy="Chamari Jayasekara"
              imageUrl="../common/user5.png"
              date="2023/07/24"
              complaint="Ticket refund not received."
              actionTaken="Investigated and refunded the amount."

              
            />
            <ResolvedComplaintCard
              id="007"
              complaintBy="Hilmi Mohomed"
              imageUrl="../common/user4.png"
              date="2023/08/01"
              complaint="Ticket refund not received."
              actionTaken="Processed refund and notified the user."
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ComplaintsPage;
