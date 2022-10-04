import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import WatchedCoinRow from "../components/WatchedCoinRow";
import ActionsModal from "../components/ActionsModal";
import CoinCard from "../components/CoinCard";
import Spinner from "../components/Spinner";
import useWindowDimensions from "../hooks/useWindowDimensions";
import getUpdateWatchedCoinsData from "../helpers/getUpdateWatchedCoinsData";

function WatchedCoins() {
  const {
    watchedCoins,
    openModal,
    dispatch,
    selectedCoin,
    priceTarget,
    loading,
  } = useContext(AppContext);
  const [updatedWatchedCoins, setUpdatedWatchedCoins] = useState([]);
  const [sortedWatchedCoins, setSortedWatchedCoins] = useState([]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    async function getCoinsData() {
      const fetchedCoins = await getUpdateWatchedCoinsData(watchedCoins);
      setUpdatedWatchedCoins(fetchedCoins);
    }

    const interval = setInterval(() => {
      getCoinsData();
    }, 60000);

    dispatch({ type: "SET_LOADING" });

    getCoinsData();

    return () => clearInterval(interval);
  }, [priceTarget, watchedCoins, dispatch]);

  useEffect(() => {
    const sortedWatchedCoins = updatedWatchedCoins.sort(
      (a, b) => b.distancePercent - a.distancePercent
    );
    setSortedWatchedCoins(sortedWatchedCoins);
    dispatch({ type: "CANCEL_LOADING" });
  }, [updatedWatchedCoins]);

  return (
    <div>
      <h2 className="title watched-coins-title">Watched tokens</h2>

      {sortedWatchedCoins.length === 0 ? (
        <p className="no-coins-info">No watched coins yet</p>
      ) : (
        <div className="coins-list">
          {loading ? (
            <Spinner />
          ) : width > 992 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Price Target</th>
                  <th>Distance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedWatchedCoins.map((coin) => (
                  <WatchedCoinRow key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          ) : (
            sortedWatchedCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} type="watched" />
            ))
          )}
          {openModal && <ActionsModal />}
        </div>
      )}
    </div>
  );
}

export default WatchedCoins;
