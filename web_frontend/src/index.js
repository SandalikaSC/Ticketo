import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./store";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette:{
    primary:{
      main: "#3D50AC",
    },
    secondary:{
      main: "#F86F5D",
    },
  },
  typography:{
    h1:{
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2:{
      fontSize: "1.75rem",
      fontWeight: 800,
    },
    h3:{
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h4:{
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h5:{
      fontSize: "1.0rem",
      fontWeight: 600,
    },
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

