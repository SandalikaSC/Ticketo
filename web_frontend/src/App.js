import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/LoginPage";
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
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
