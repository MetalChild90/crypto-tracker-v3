import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "./components/SearchBox";
import DisplayCoins from "./components/DisplayCoins";
import DisplaySingleCoin from "./components/DisplaySingleCoin";
import Pagination from "./components/Pagination";
import "./App.css";

const BASE_URL = "https://api.coingecko.com/api/v3";

function App() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [allCoinNames, setAllCoinNames] = useState([]);
  const [showSetItem, setShowSetItem] = useState(false);
  const [showCoinNames, setShowCoinNames] = useState(false);
  const [watchedCoins, setWatchedCoins] = useState([]);
  const [watchedCoinNames, setWatchedCoinNames] = useState([]);
  const [coinNamesNotification, setCoinNamesNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(55);

  function addNewCoin(coin) {
    setSelectedCoin(coin);
    setShowSetItem(true);
    setShowCoinNames(false);
  }

  function handleClickMainButton() {
    setShowCoinNames(!showCoinNames);
    setSelectedCoin(null);
    setShowSetItem(false);
  }

  useEffect(() => {
    const watchedCoinNames = watchedCoins.map((coin) => coin.name);

    setWatchedCoinNames(watchedCoinNames);
  }, [watchedCoins]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/coins/list`);

        const coins = res.data;

        let coinNames = coins.map((coin) => coin.name.toLowerCase());

        coinNames = coinNames.filter((coin) =>
          !coin.includes("-") &&
          !coin.includes(".") &&
          !coin.includes("1x") &&
          !coin.includes("3x") &&
          !coin.includes("aave ")
            ? coin
            : ""
        );

        setAllCoinNames(coinNames);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setCoinNamesNotification(
          "Something went wrong. Please, refresh or try again later."
        );
      }
    };

    getCoins();
  }, []);

  function addCoinToWatchedList(coin, priceTarget) {
    setWatchedCoins((prevState) => {
      return [
        ...prevState,
        { ...coin, priceTarget: priceTarget, id: uuidv4() },
      ];
    });
    setShowSetItem(false);
    setSelectedCoin(null);
  }

  function deleteItem(id) {
    setWatchedCoins((prevState) => {
      return prevState.filter((coin) => {
        return coin.id !== id;
      });
    });
  }

  function editItem(id, target) {
    let updatedState = watchedCoins.map((coin) => {
      if (coin.id === id) {
        return { ...coin, priceTarget: target };
      }
      return coin;
    });
    setWatchedCoins(updatedState);
  }

  function closeSetItem() {
    setSelectedCoin(null);
    setShowSetItem(false);
  }

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = allCoinNames.slice(indexOfFirstCoin, indexOfLastCoin);
  function paginate(pageNumber) {
    return setCurrentPage(pageNumber);
  }

  return (
    <div className="App">
      <div className="wrapper">
        {!coinNamesNotification ? (
          <>
            <h1 className="title main-title">crypto tracker</h1>
            <SearchBox
              addCoin={addNewCoin}
              coinNames={allCoinNames}
              selectedCoin={selectedCoin}
              watchedCoinNames={watchedCoinNames}
              showCoinNames={showCoinNames}
            />
            <button className="button" onClick={handleClickMainButton}>
              {!showCoinNames ? "Show All Coins" : "Show Watched Coins"}
            </button>
            {showSetItem && (
              <>
                <h3 className="title new-token-title">Add new token</h3>
                <DisplaySingleCoin
                  type="add"
                  coin={selectedCoin}
                  addCoin={addCoinToWatchedList}
                  closeSetItem={closeSetItem}
                  BASE_URL={BASE_URL}
                />
              </>
            )}
            {!showCoinNames && watchedCoins.length > 0 && (
              <div>
                <h3 className="title watched-coins-title">Watched tokens</h3>
                {watchedCoins.map((coin) => {
                  return (
                    <DisplaySingleCoin
                      key={coin.id}
                      coin={coin}
                      type="list"
                      deleteItem={deleteItem}
                      editCoin={editItem}
                      BASE_URL={BASE_URL}
                    />
                  );
                })}
              </div>
            )}
            {!showCoinNames && watchedCoins.length === 0 && (
              <p className="no-coins-info">No watched coins yet</p>
            )}
            {showCoinNames && (
              <div className="all-coins-wrapper">
                <DisplayCoins
                  coins={currentCoins}
                  watchedCoinNames={watchedCoinNames}
                  loading={loading}
                  addCoin={addNewCoin}
                />
                <Pagination
                  coinsPerPage={coinsPerPage}
                  totalCoins={allCoinNames.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="coinNamesNotification">{coinNamesNotification}</div>
        )}
      </div>
    </div>
  );
}

export default App;
