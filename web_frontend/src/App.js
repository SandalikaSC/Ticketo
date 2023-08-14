import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import AdminPage from "./pages/admin/admin_home";
import ControlCentrePage from "./pages/controlCenter/controlCentre_home";
import TicketClerkPage from "./pages/ticketClerk/ticketClerk_home";
import StationMasterPage from "./pages/stationMaster/stationMaster_home";
import ProtectedRoute from "./routes/protectedRoutes";
import ResetPassword from './pages/password_reset';

const App = () =>
{
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  // Check for authentication token on app initialization
  useEffect(() =>
  {
    const token = localStorage.getItem("accessToken"); // Use the appropriate key
    if (token)
    {
      dispatch({ type: "SET_LOGGED_IN", payload: true }); // Replace with your action
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
    </React.Fragment>
  );
};

export default App;
