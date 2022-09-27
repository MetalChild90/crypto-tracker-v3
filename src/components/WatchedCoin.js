import { useState, useEffect } from "react";
import { getCoin } from "../context/AppActions";
import calculatePercent from "../helpers/calculatePercent";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { FiMoreHorizontal } from "react-icons/fi";
import PriceTargetForm from "../components/PriceTargetForm";

import "./WatchedCoin.css";
import SelectedCoin from "../pages/SelectedCoin";

function WatchedCoin({ coin }) {
  const { editMode, dispatch, watchedCoins, selectedCoin, priceTarget } =
    useContext(AppContext);
  const [distancePercent, setDistancePercent] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const fetchCoin = () => {
      getCoin(coin.id)
        .then((data) => setPrice(data.market_data.current_price.usd))
        .then(setLoading(false));
    };

    fetchCoin();

    const interval = setInterval(() => {
      fetchCoin();
    }, 1000);

    return () => clearInterval(interval);
  }, [coin.id]);

  useEffect(() => {
    setDistancePercent(calculatePercent(price, coin.priceTarget));
  }, [price, editMode, coin.priceTarget]);

  const handleClick = () => {
    dispatch({ type: "OPEN_MODAL", payload: coin });
  };

  const handleSaveChanges = () => {
    const updatedWatchedCoins = watchedCoins.map((coin) =>
      coin.id === selectedCoin.id ? { ...selectedCoin, priceTarget } : coin
    );
    dispatch({ type: "SAVE_EDITION", payload: updatedWatchedCoins });
  };

  return (
    <>
      <tr key={coin.id}>
        <td>{coin.name}</td>
        <td>{!loading ? `${price}$` : "Is loading..."}</td>
        <td>
          {editMode && selectedCoin.id === coin.id ? (
            <PriceTargetForm />
          ) : (
            `${coin.priceTarget}$`
          )}
        </td>
        <td>{coin.priceTarget === 0 ? "----" : distancePercent + "%"}</td>
        <td>
          {editMode && selectedCoin.id === coin.id ? (
            <div>
              <button onClick={handleSaveChanges}>Save</button>
              <button onClick={() => dispatch({ type: "DISCARD_EDITION" })}>
                Discard
              </button>
            </div>
          ) : (
            <span>
              <FiMoreHorizontal
                className="icon-horiz cursor"
                onClick={handleClick}
              />
            </span>
          )}
        </td>
      </tr>
    </>
  );
}

export default WatchedCoin;
