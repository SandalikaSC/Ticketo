import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ControlCenterProvider } from './ControlCenterContext'; // Import your created context

import App from './App'; // Your main app component

const Root = () => {
  return (
    <ControlCenterProvider>
      <Router>
        <App />
      </Router>
    </ControlCenterProvider>
  );
};

export default Root;
