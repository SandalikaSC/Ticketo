// import React from 'react';
// import { render } from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';

// render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Router>
    <App />
  </Router>
);

