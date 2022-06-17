import React from "react";
import ReactDOM from "react-dom";
import Game from "../components/game/Game";
import Inventory from "../components/Inventory";
import { ProvideState } from "../components/utils/state";
import { ProvideAuth } from "../components/utils/auth";
import Social from "../components/Social";
import Navigation from "../components/Navigation";
import OpenSeaDragon from "../components/OpenSeaDragon";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import 'bootstrap/dist/css/bootstrap.css';
import "../assets/main.css";
import "../assets/css/game.css";
import "../assets/css/inventory.css";
import "../assets/css/loading.css";
import "../assets/css/bootstrap.css";



// const Appli = () => {
//   return (
//     <>
//       <div className="content">


//         <div className="column left">
//           <Inventory />
//         </div>
//         <div className="column center">
//           <Game />
//         </div>

//         <div className="column right">
//           <h2>IC Birds</h2>
//           <h4>
//             <button>MarketPlace</button>
//           </h4>
//           <Social />
//         </div>
//       </div>
//     </>
//   );
// }

// function App() {

//   return (
//     <div className="App">
//       <Navigation />
//       <Routes>
//         <Route path="/" exact element={<Appli />} />
//         <Route path="/view" exact element={<OpenSeaDragon />} />
//       </Routes>
//     </div>
//   );
// }

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <ProvideState>
          <AppRouter />
      </ProvideState>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("app")
);


