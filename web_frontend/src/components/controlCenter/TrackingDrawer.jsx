import React from 'react';

const Drawer = ({ isOpen, children }) => {
  return (
    <div
      style={{
        width: isOpen ? '22.5%' : '0',
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        backgroundColor: '#f5f5f5',
        overflowX: 'hidden',
        transition: '0.3s',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div style={{ padding: '20px', display: isOpen ? 'block' : 'none' }}>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
