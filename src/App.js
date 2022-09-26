import Coins from "./pages/Coins";
import WatchedCoins from "./pages/WatchedCoins";
import SelectedCoin from "./pages/SelectedCoin";
import Header from "./components/Header";
import Home from "./pages/Home";
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
            {/* <Route path="/async-wrapper/:id" element={<AsyncWrapper />} /> */}
            <Route path="/watched-coins" element={<WatchedCoins />} />
            <Route path="/coins" element={<Coins />} />
          </Routes>
          <div className="coinNamesNotification">{coinNamesNotification}</div>
        </div>
      </div>
    </Router>
  );
}

export default App;
