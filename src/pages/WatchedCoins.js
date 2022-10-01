import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import WatchedCoin from "../components/WatchedCoin";
import ActionsModal from "../components/ActionsModal";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CoinCard from "../components/CoinCard";

function WatchedCoins() {
  const { watchedCoins, openModal, dispatch, selectedCoin, priceTarget } =
    useContext(AppContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    return () => {
      dispatch({ type: "DISCARD_EDITION" });
    };
  }, [dispatch]);

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
      <h2 className="title watched-coins-title">Watched tokens</h2>

      {watchedCoins.length === 0 ? (
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
                {watchedCoins?.map((coin) => (
                  <WatchedCoin key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          ) : (
            watchedCoins.map((coin) => (
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
      )}
    </div>
  );
}

export default WatchedCoins;
