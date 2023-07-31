import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element }) =>
{
    // Your logic to check if the user is logged in or not
    const isLoggedIn = useSelector((state) => state.isLoggedIn); // Get the isLoggedIn state from Redux
    // Make sure that you have set up the Redux store properly with the isLoggedIn state

    // Example: If you have a boolean isLoggedIn state in Redux that indicates whether the user is logged in or not

    // If isLoggedIn is true, it means the user is authenticated, so we can render the element (protected component)
    // Otherwise, we redirect the user to the login page

    return isLoggedIn ? element : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
