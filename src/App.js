import AllCoins from "./components/AllCoins";
import WatchedCoins from "./components/WatchedCoins";
import SelectedCoin from "./components/SelectedCoin";
import Header from "./components/Header";
import Home from "./components/Home";
import { useContext } from "react";
import AppContext from "../src/context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  const {
    coins,
    selectedCoin,
    coinNamesNotification,
    handleClickMainButton,
    showCoinNames,
    showSetItem,
    watchedCoins,
    priceTarget,
  } = useContext(AppContext);

  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="box-beneath-header"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/selected-coin/:id" element={<SelectedCoin />} />
            <Route path="/watched-coins" element={<WatchedCoins />} />
            <Route path="/all-coins" element={<AllCoins />} />
          </Routes>
          <div className="coinNamesNotification">{coinNamesNotification}</div>
        </div>
      </div>
    </Router>
  );
}

export default App;
