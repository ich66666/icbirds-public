import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Inventory from "../components/Inventory";
import Navigation from "../components/Navigation";
import OpenSeaDragon from "../components/OpenSeaDragon";
import Game from "../components/game/Game";
import Table_types from "../components/Table_types";
import About from "../components/About";
import Store from "../components/Store";
import LeaderBoard from "../components/Leaderboard";
import { useState, useEffect } from "react";



const App = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);



  if (width < 1000)
    return (
      <>
        <div className="content">
          <Game />
        </div>
        <div className="content">
          <Inventory />
        </div>
      </>
    )
  return (
    <>
      <div className="content">
        <div className="column left">
          <Inventory />
        </div>
        <div className="column center">
          <Game />
        </div>
        <div className="column right">
          <Store />
        </div>
      </div>
    </>
  );
}

const Gallery = () => {
  return (
    <OpenSeaDragon />
  )
}



export default function AppRouter() {

  return (<>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/game" element={<App />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/home" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/attributes" element={<Table_types />} />
        <Route path="" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  </>
  );
}