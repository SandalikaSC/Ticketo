import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import { useSelector } from "react-redux/es/hooks/useSelector";

function App()
{
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}{""}
          { }
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
