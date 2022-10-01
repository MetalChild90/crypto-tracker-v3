import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import WatchedCoinRow from "../components/WatchedCoinRow";
import ActionsModal from "../components/ActionsModal";
import CoinCard from "../components/CoinCard";
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
  const [updatedWatchedCoins, setUpdatedWatchedCoins] = useState();

  const { width } = useWindowDimensions();

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedWatchedCoins(getUpdateWatchedCoinsData(watchedCoins));
    }, 60000);

    dispatch({ type: "SET_LOADING" });

    setUpdatedWatchedCoins(getUpdateWatchedCoinsData(watchedCoins));

    return () => clearInterval(interval);
  }, [priceTarget, watchedCoins]);

  // const sortedWatchedCoins = updatedWatchedCoins.sort(
  //   (a, b) => b.distancePercent - a.distancePercent
  // );

  useEffect(() => {
    dispatch({ type: "CANCEL_LOADING" });
  }, [updatedWatchedCoins]);

  const handleSaveChanges = () => {
    if (priceTarget <= 0 || isNaN(priceTarget)) {
      dispatch({
        type: "SET_ERROR_PRICE_NOTIFICATION",
        payload: "Price target can't be 0",
      });
      return;
    } else {
      const updatedWatchedCoins = watchedCoins.map((coin) =>
        coin.id === selectedCoin.id ? { ...selectedCoin, priceTarget } : coin
      );
      dispatch({ type: "SAVE_EDITION", payload: updatedWatchedCoins });
    }
  };

  return (
    <div>
      {/* <h2 className="title watched-coins-title">Watched tokens</h2>

      {sortedWatchedCoins.length === 0 ? (
        <p className="no-coins-info">No watched coins yet</p>
      ) : (
        <div className="watched-coins-wrapper">
          {width > 768 ? (
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
                {loading
                  ? "Is loading"
                  : sortedWatchedCoins.map((coin) => (
                      <WatchedCoinRow key={coin.id} coin={coin} />
                    ))}
              </tbody>
            </table>
          ) : loading ? (
            "Is loading"
          ) : (
            sortedWatchedCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                type="watched"
                handleSaveChanges={handleSaveChanges}
              />
            ))
          )}
          {openModal && <ActionsModal />}
        </div>
      )} */}
    </div>
  );
}

export default WatchedCoins;
