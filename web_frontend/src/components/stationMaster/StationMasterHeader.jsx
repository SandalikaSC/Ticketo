import React from 'react';
import profileImage from '../common/profile-image.png';

const StationMasterHeader = () => {
  return (
    <div className="sm-header">
      <div className="sm-profile">
        <img src={profileImage} alt="SM Profile" />
        <span>Station Master </span>
      </div>
    </div>
  );
};

export default StationMasterHeader;
