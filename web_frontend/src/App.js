import React from "react";
import { Route, Routes } from "react-router-dom";
//import './App.css';
import Login from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import AdminPage from "./pages/admin/admin_home";
import ControlCentrePage from "./pages/controlCenter/controlCentre_home";
import TicketClerkPage from "./pages/ticketClerk/ticketClerk_home";
import StationMasterPage from "./pages/stationMaster/stationMaster_home";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProtectedRoute from "./routes/protectedRoutes";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#ececec',
//     },
//   },
// });

const App = () =>
{
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <React.Fragment>

      {/* <ThemeProvider theme={theme}> */}
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}
          <Route
            path="/admin/*"
            element={<ProtectedRoute element={<AdminPage />} />}
          />
          <Route
            path="/cc/*"
            element={<ProtectedRoute element={<ControlCentrePage />} />}
          />
          <Route
            path="/ss/*"
            element={<ProtectedRoute element={<StationMasterPage />} />}
          />
          <Route
            path="/tc/*"
            element={<ProtectedRoute element={<TicketClerkPage />} />}
          />
        </Routes>
      </main>
      { }
    </React.Fragment>
  );
};

export default App;