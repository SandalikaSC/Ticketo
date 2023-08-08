import React from "react";

function CheckerClerkCard({ Name }) {
  return (
    <div className="card">
      <h2>{Name}</h2>
      <button>View</button>
    </div>
  );
}

export default CheckerClerkCard;
