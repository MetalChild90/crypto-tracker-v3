import Coins from "./pages/Coins";
import WatchedCoins from "./pages/WatchedCoins";
import SelectedCoin from "./pages/SelectedCoin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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
            <Route path="/coins" element={<Coins />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
