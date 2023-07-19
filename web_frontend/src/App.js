import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/LoginPage";
import { useSelector } from "react-redux/es/hooks/useSelector";

//Control center imports for testing purposes only
import Sidebar from './components/controlCenter/CCSidebar';
import TrainInfo from './pages/ControlCentre/TrainInfo.jsx';
import AssignGuards from './pages/ControlCentre/AssignGuards';
import Delays from './pages/ControlCentre/Delays';
import TrackTrains from './pages/ControlCentre/TrackTrains.jsx';
import Stations from './pages/ControlCentre/Stations.jsx';
import Settings from './pages/ControlCentre/Settings.jsx';

function App()
{
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);

  return (

    // <BrowserRouter>
    //   <Sidebar>
    //     <Routes>
    //       <Route path="/" element={<Delays />} />
    //       <Route path="/delays" element={<Delays />} />
    //       <Route path="/tracktrains" element={<TrackTrains />} />
    //       <Route path="/traininfo" element={<TrainInfo />} />
    //       <Route path="/assignGuards" element={<AssignGuards />} />
    //       <Route path="/stations" element={<Stations />} />
    //       <Route path="/settings" element={<Settings />} />
    //     </Routes>
    //   </Sidebar>
    // </BrowserRouter>

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
